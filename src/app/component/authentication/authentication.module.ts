import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, AuthenticationRoutingModule, FormsModule],
})
export class AuthenticationModule {}
