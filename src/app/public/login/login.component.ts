import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../services/models/user/user-model';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.user$) {
      this.authenticationService.user$.toPromise().then((user: User) => {
        this.router.navigate(['/secure/upload']);
      });
    }
  }

  login(email, password) {
    this.authenticationService
      .login(email, password)
      .subscribe(
        (user: User) => {
            if (!!user) {
            this.router.navigate(['/secure/upload']);
          }
        },
        error => {}
      );
  }

}
