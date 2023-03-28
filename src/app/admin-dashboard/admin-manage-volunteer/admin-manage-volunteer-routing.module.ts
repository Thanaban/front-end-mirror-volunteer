import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManageVolunteerComponent } from './admin-manage-volunteer.component';

const routes: Routes = [{ path: '', component: AdminManageVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageVolunteerRoutingModule { }
