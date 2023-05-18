import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';

import { OpeneventRoutingModule } from './openevent-routing.module';
import { OpeneventComponent } from './openevent.component';

import { BrowserModule } from '@angular/platform-browser';
import { ModalEventComponent } from './modal-event/modal-event.component';

import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SuccessJoinEventComponent } from './success-join-event/success-join-event.component';
import { PleaseLoginComponent } from './please-login/please-login.component';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ImageSliderModule } from '../image-slider/image-slider.module';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    OpeneventComponent,
    SuccessJoinEventComponent,
    PleaseLoginComponent,
    
    
  ],
  imports: [
    CommonModule,
    OpeneventRoutingModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    ImageSliderModule,
    MatCardModule,
    ScrollingModule
  ]
})
export class OpeneventModule { }
