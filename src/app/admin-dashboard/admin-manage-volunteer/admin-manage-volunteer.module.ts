import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManageVolunteerRoutingModule } from './admin-manage-volunteer-routing.module';
import { AdminManageVolunteerComponent } from './admin-manage-volunteer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AdminManageVolunteerRoutingModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
    
  ]
})
export class AdminManageVolunteerModule { }
