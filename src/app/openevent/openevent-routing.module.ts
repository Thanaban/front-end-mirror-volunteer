import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeneventComponent } from './openevent.component';

const routes: Routes = [{ path: '', component: OpeneventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeneventRoutingModule { }
