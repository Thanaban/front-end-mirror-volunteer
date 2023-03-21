import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';

import { OpeneventRoutingModule } from './openevent-routing.module';
import { OpeneventComponent } from './openevent.component';

import { BrowserModule } from '@angular/platform-browser';
import { EventDialogComponent } from './event-dialog/event-dialog.component'

@NgModule({
  declarations: [
    OpeneventComponent,
    EventDialogComponent
  ],
  imports: [
    CommonModule,
    OpeneventRoutingModule,
    BrowserModule,
    MatDialogModule
  ]
})
export class OpeneventModule { }
