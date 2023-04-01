import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertRoutingModule } from './cert-routing.module';
import { CertComponent } from './cert.component';


@NgModule({
  declarations: [
    CertComponent
  ],
  imports: [
    CommonModule,
    CertRoutingModule
  ]
})
export class CertModule { }
