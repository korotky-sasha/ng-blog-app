import { Component, OnInit } from '@angular/core';

import {
  faCalendarAlt, faNewspaper, faMailBulk, faSuitcaseRolling, faPlay, faHeartbeat, faGraduationCap, faBusinessTime, faLightbulb
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faNewspaper = faNewspaper;
  faMailBulk = faMailBulk;
  faSuitcaseRolling = faSuitcaseRolling;
  faPlay = faPlay;
  faHeartbeat = faHeartbeat;
  faGraduationCap = faGraduationCap;
  faBusinessTime = faBusinessTime;
  faLightbulb = faLightbulb;

  title = 'ng-blog-app';
  sidenavOpened = true;
  sidenavToggleText = '<';
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

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
    this.sidenavToggleText = this.sidenavOpened ? '<' : '>';
  }

  logout() {
    this.authService.logout();
  }
}
