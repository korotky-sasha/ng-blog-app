import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import {tap, shareReplay } from 'rxjs/operators';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated$: Subject<boolean>;

  constructor(
    private http: HttpClient
  ) {
    this.isAuthenticated$ = new ReplaySubject(1);
  }

  loginUser(user: User): Observable<object> {
    return this.http.post<User>(`/api/auth/login`, user).pipe(
      tap(value => {
        // @ts-ignore
       if (value.token) {this.setSession(value.token); } else { console.log('Failed to post user'); }
      }),
      shareReplay()
    );
  }

  addUser(user: User): Observable<object> {
    return this.http.post<User>(`/api/auth/register`, user).pipe(
      tap(value => {
        // @ts-ignore
        if (value.token) {this.setSession(value.token); } else { console.log('Failed to post user'); }
      }),
      shareReplay()
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
  }

  setup() {
    this.isAuthenticated$.next(!!localStorage.getItem('token'));
  }

  get IsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  private setSession(authResult) {
    localStorage.setItem('token', authResult);
    this.isAuthenticated$.next(true);
  }
}
