import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-blog-app';
  isLogin = !!localStorage.getItem('token');
  isLogin$ = this.authService.IsAuthenticated;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLogin$.subscribe( value => {
      this.isLogin = value;
    });

    window.addEventListener('storage', ev => {
      console.log('Event fired', ev);
    }, false);
  }

  logout() {
    this.authService.logout();
    this.isLogin = false;
  }

  login() {
    this.router.navigate(['login']);
  }
}
