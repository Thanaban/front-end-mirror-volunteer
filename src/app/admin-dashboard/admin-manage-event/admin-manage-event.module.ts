import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManageEventRoutingModule } from './admin-manage-event-routing.module';
import { AdminManageEventComponent } from './admin-manage-event.component';


@NgModule({
  declarations: [
    AdminManageEventComponent
  ],
  imports: [
    CommonModule,
    AdminManageEventRoutingModule
  ]
})
export class AdminManageEventModule { }
