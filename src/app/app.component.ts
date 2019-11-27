import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  faCalendarAlt, faNewspaper, faSuitcaseRolling, faPlay, faHeartbeat, faGraduationCap, faBusinessTime, faLightbulb, faBars
} from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material';

import { AVATAR } from './shared/constants/avatar.constant';

import { ConfirmDialogComponent } from './posts/confirm-dialog/confirm-dialog.component';

import { AuthService } from './auth/services/auth.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faNewspaper = faNewspaper;
  faSuitcaseRolling = faSuitcaseRolling;
  faPlay = faPlay;
  faHeartbeat = faHeartbeat;
  faGraduationCap = faGraduationCap;
  faBusinessTime = faBusinessTime;
  faLightbulb = faLightbulb;
  faBars = faBars;
  avatarSource = AVATAR;

  title = 'ng-blog-app';
  isLogin: boolean;
  isLogin$ = this.authService.IsAuthenticated;
  userEmail: string;
  userEmail$ = this.authService.UserEmail;

  constructor(
    private router: Router,
    private dialog: MatDialog,
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
    this.confirmDialog('Are you sure you want to log out?').subscribe(value => {
      if (value) {
        this.authService.logout();
      }
    });
  }

  confirmDialog(message?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message}
    });
    return  dialogRef.afterClosed();
  }
}
