import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { CommonModule } from '@angular/common';
import {UploadComponent} from '../components/upload/upload.component';
import {ContactComponent} from '../components/contact/contact.component';
import {NavbarComponent} from '../layout/navbar/navbar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SecureComponent, UploadComponent, ContactComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [SecureComponent],
  providers: []
})
export class SecureModule {}
