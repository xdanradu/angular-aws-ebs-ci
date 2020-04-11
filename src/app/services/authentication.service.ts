import { Injectable, Injector } from '@angular/core';
import {User} from './models/user/user-model';
import {Observable, of} from 'rxjs';
import {delay, switchMap} from 'rxjs/operators';
import {StorageApp} from './storage-app';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

export const USER_ID = 'id';
export const TOKEN = 'token';
export const fakeUser: User = {  id: 1, firstName: 'Max', lastName: 'M', emailAddress: 'a@a.com', jwt: 'jwt'};

const fakeLoginHTTP$ = of(fakeUser).pipe(
  delay(200),
);

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private privateUser: User = null;
  private privateUser$: Observable<User>;

  constructor(private router: Router, private httpClient: HttpClient) {}

  get userId() {
    return StorageApp.get(USER_ID) ? StorageApp.get(USER_ID) : null;
  }

  get jwt() {
    return StorageApp.get(TOKEN) ? StorageApp.get(TOKEN) : null;
  }

  get user(): User {
    return this.privateUser ? this.privateUser : null;
  }

  get user$(): Observable<User> {
    if (this.userId) {
      if (!this.privateUser$) {

        // this.httpClient.post(endpoint, formData, { headers: null });

        this.privateUser$ = fakeLoginHTTP$.pipe(
          switchMap(
            () => {
              console.log('Switching to api call');
              return fakeLoginHTTP$;
            }
        ));
      }
      return this.privateUser$;
    }
    return undefined;
  }

  login(
    username: string,
    password: string,
  ): Observable<User>{
    return new Observable((subscriber) => {
    this.httpClient.post('http://localhost:5000/login', {username: username, password: password}).subscribe(
      (result: any) => {
        StorageApp.set(TOKEN, result.accessToken);
        StorageApp.set(USER_ID, username);
        this.privateUser = fakeUser;
        subscriber.next(fakeUser);
      }, () => subscriber.error('login error')
    );
    });
    
  }

  logoutUser() {
    StorageApp.clear();
    this.privateUser = null;
    this.privateUser$ = null;
    this.router.navigate(['/public/login']).then(() => {
    });
  }

}
