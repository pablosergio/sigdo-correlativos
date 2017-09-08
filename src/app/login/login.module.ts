import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../common/shared';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
