import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isUnauthorized = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginUser(event) {
    this.authService.loginUser(event).subscribe(value => {
        // @ts-ignore
        if (value && value.token) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/posts']);
        }
      },
      (er) => {
        console.log(er);
        if (er.statusText === 'Unauthorized') {
          console.log(er.statusText);
          this.isUnauthorized = true;
        }
      });
  }
}
