import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  entryComponents: []
})
export class LoginModule {}
