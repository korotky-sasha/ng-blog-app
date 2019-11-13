import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addUser(event) {
    this.authService.addUser(event).subscribe(value => {
        // @ts-ignore
        if (value && value.token) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/posts']);
        }
      },
      (er) => {
        console.log(er);
        if (er.statusText === 'Failed to add user') {
          console.log(er.statusText);
        }
      });
  }
}
