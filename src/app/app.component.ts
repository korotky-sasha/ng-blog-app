import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-blog-app';
  isLogin: boolean;
  isLogin$ = this.authService.IsAuthenticated;
  userEmail: string;
  userEmail$ = this.authService.UserEmail;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLogin$.subscribe( value => {
      this.isLogin = value;
    });
    this.userEmail$.subscribe( value => {
      this.userEmail = value;
    });
    this.authService.setup();
  }

  logout() {
    this.authService.logout();
  }
}
