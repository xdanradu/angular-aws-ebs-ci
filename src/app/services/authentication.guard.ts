import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


import {User} from './models/user/user-model';
import {AuthenticationService} from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {



  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}



  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (await this.verifyUser()) {
      // logged in so return true
      return true;
    }

    console.log('the user is not logged in so redirect to login');
    await this.router.navigate(['/public/login']);
    return false;
  }

  private async verifyUser(): Promise<boolean> {
    let authenticated = false;
    if (this.authenticationService.user$) {
      await this.authenticationService.user$.toPromise().then((user: User) => {
        console.log('Connected as: ' + user.emailAddress);
        authenticated = !!user;
      });
    }
    return authenticated;
  }
}
