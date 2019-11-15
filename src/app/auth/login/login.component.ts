import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isUnauthorized: boolean;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  loginUser(user) {
    this.authService.loginUser(user).subscribe(() => {
        this.router.navigate(['/posts']);
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
