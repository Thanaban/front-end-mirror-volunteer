import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManageEventRoutingModule } from './admin-manage-event-routing.module';
import { AdminManageEventComponent } from './admin-manage-event.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { EditEventDetailComponent } from './edit-event-detail/edit-event-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';

@NgModule({
  declarations: [
    AdminManageEventComponent,
    AddEventComponent,
    
  ],
  imports: [
    CommonModule,
    AdminManageEventRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    FormsModule,
    MatDialogModule
  ]
})
export class AdminManageEventModule { }
