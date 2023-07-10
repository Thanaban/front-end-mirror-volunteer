import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { CancelEventConfirmComponent } from './cancel-event-confirm/cancel-event-confirm.component';
import { CertificateComponent } from './cer/certificate.component';
import { ProfileComponent } from './profile.component';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    CertificateComponent,
    ProfileComponent
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonToggleModule,
    MatMenuModule
  ]
})
export class ProfileModule { }
