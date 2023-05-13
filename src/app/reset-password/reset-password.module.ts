import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResetPasswordComponent
    
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    MatCardModule,
    FormsModule
  ]
})
export class ResetPasswordModule { }
