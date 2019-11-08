import { Component, OnInit } from '@angular/core';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  addUser() {
    console.log('Submitted', this.userEmail, this.userPassword);
    const user = {
      email: this.userEmail,
      password: this.userPassword
    };
    this.authService.addUser(user).subscribe(value => {
      console.log(value);
    });
  }
}
