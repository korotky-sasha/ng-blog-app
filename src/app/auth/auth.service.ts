import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

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
    this.isAuthenticated$ = new Subject();
  }

  loginUser(user: User): Observable<object> {
    return this.http.post<User>(`//localhost:3000/api/auth/login`, user).pipe(
      tap(value => {
        // @ts-ignore
       if (value.token) {this.setSession(value.token); } else { console.log('fail'); }
      }),
      shareReplay()
    );
  }

  addUser(user: User): Observable<object> {
    return this.http.post<User>(`//localhost:3000/api/auth/register`, user);
  }

  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
  }

  get IsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  private setSession(authResult) {
    localStorage.setItem('token', authResult);
    this.isAuthenticated$.next(true);
  }
}
