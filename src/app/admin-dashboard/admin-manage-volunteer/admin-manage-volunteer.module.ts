import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManageVolunteerRoutingModule } from './admin-manage-volunteer-routing.module';
import { AdminManageVolunteerComponent } from './admin-manage-volunteer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminManageVolunteerComponent
  ],
  imports: [
    CommonModule,
    AdminManageVolunteerRoutingModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule
    
    
  ]
})
export class AdminManageVolunteerModule { }
