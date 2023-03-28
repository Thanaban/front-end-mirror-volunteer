import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManageVolunteerRoutingModule } from './admin-manage-volunteer-routing.module';
import { AdminManageVolunteerComponent } from './admin-manage-volunteer.component';


@NgModule({
  declarations: [
    AdminManageVolunteerComponent
  ],
  imports: [
    CommonModule,
    AdminManageVolunteerRoutingModule
  ]
})
export class AdminManageVolunteerModule { }
