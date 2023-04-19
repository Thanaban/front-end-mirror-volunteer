import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { CdkTableModule} from '@angular/cdk/table';
import { AdminManageVolunteerComponent } from './admin-manage-volunteer/admin-manage-volunteer.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import {MatDividerModule} from '@angular/material/divider';
import { BlacklistSnackBarComponent } from './Snack-bar/blacklist-snack-bar/blacklist-snack-bar.component';
import { AdminVolunteerListComponent } from './admin-volunteer-list/admin-volunteer-list.component';
import { AdminManageVolunteerListComponent } from './admin-manage-volunteer-list/admin-manage-volunteer-list.component';
import { ConfirmEditVolunteerListComponent } from './admin-manage-volunteer-list/confirm-edit-volunteer-list/confirm-edit-volunteer-list.component';

@NgModule({
  declarations: [
  
  
    
  
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminDashboardRoutingModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
    
  ]
})
export class AdminDashboardModule { }
