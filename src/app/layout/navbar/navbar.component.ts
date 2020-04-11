import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../services/models/user/user-model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authenticationService.user$) {
      this.authenticationService.user$.subscribe((user: User) => {
        this.user = user;
      });
    }
  }

  logout() {
    this.authenticationService.logoutUser();
  }
}
