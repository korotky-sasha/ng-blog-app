import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  addUser(user) {
    this.authService.addUser(user).subscribe(
      () => this.router.navigate(['/posts']),
      (er) => {
        console.log(er);
        if (er.statusText === 'Failed to add user') {
          console.log(er.statusText);
        }
      });
  }
}
