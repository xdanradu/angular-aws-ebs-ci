import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {LoginModule} from './login/login.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, RouterModule, LoginModule],
  exports: [PublicComponent]
})
export class PublicModule {}
