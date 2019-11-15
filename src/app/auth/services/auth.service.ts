import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject, ReplaySubject } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated$: Subject<boolean>;
  private userEmail$: Subject<string>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isAuthenticated$ = new ReplaySubject(1);
    this.userEmail$ = new ReplaySubject(1);
  }

  loginUser(user: User): Observable<void> {
    return this.http.post<User>(`/api/auth/login`, user)
      .pipe(
        pluck('token'),
        map(token => this.setSession(token, user.email))
      );
  }

  addUser(user: User): Observable<void> {
    return this.http.post<User>(`/api/auth/register`, user)
      .pipe(
        pluck('token'),
        map(token => this.setSession(token, user.email))
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated$.next(false);
    this.userEmail$.next(null);
    this.router.navigate(['/login']);
  }

  setup() {
    this.isAuthenticated$.next(!!localStorage.getItem('token'));
    this.userEmail$.next(localStorage.getItem('user'));
  }

  get IsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  get UserEmail(): Observable<string> {
    return this.userEmail$.asObservable();
  }

  private setSession(authResult, userEmail) {
    localStorage.setItem('token', authResult);
    localStorage.setItem('user', userEmail);
    this.isAuthenticated$.next(true);
    this.userEmail$.next(userEmail);
  }
}
