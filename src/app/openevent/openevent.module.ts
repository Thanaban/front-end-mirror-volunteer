import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';

import { OpeneventRoutingModule } from './openevent-routing.module';
import { OpeneventComponent } from './openevent.component';

import { BrowserModule } from '@angular/platform-browser';
import { ModalEventComponent } from './modal-event/modal-event.component';

import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    OpeneventComponent,
    
    
  ],
  imports: [
    CommonModule,
    OpeneventRoutingModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class OpeneventModule { }
