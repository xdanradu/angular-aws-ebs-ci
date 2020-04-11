import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UploadComponent} from './components/upload/upload.component';
import {ContactComponent} from './components/contact/contact.component';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LoginComponent} from './public/login/login.component';
import {PublicComponent} from './public/public.component';
import {SecureComponent} from './secure/secure.component';
import {AuthenticationGuard} from './services/authentication.guard';


const routes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'secure',
    component: SecureComponent,
    children: [
      { path: 'upload', component: UploadComponent },
      { path: 'contact', component: ContactComponent }
    ],
    canActivate: [AuthenticationGuard]
  },
  { path: '',   redirectTo: 'public/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
