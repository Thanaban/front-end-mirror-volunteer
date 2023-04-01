import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPasswordRoutingModule } from './confirm-password-routing.module';
import { ConfirmPasswordComponent } from './confirm-password.component';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    ConfirmPasswordComponent
  ],
  imports: [
    CommonModule,
    ConfirmPasswordRoutingModule,
    FormsModule,
    MatCardModule
  ]
})
export class ConfirmPasswordModule { }
