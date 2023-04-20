import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { CancelEventConfirmComponent } from './cancel-event-confirm/cancel-event-confirm.component';


@NgModule({
  declarations: [
    
  
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule
  ]
})
export class ProfileModule { }
