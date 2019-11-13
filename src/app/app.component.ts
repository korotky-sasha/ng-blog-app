import { Component, OnInit } from '@angular/core';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLogin$.subscribe( value => {
      this.isLogin = value;
    });
  }

  logout() {
    this.authService.logout();
    this.isLogin = false;
  }
}
