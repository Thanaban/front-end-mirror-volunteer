import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManageEventComponent } from './admin-manage-event.component';

const routes: Routes = [{ path: '', component: AdminManageEventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageEventRoutingModule { }
