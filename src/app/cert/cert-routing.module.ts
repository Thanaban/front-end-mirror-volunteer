import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertComponent } from './cert.component';

const routes: Routes = [{ path: '', component: CertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertRoutingModule { }
