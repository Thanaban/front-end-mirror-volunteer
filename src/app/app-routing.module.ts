import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { OpeneventComponent } from './openevent/openevent.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminManageVolunteerComponent } from './admin-dashboard/admin-manage-volunteer/admin-manage-volunteer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  // { path: 'mod', component: BoardModeratorComponent },
  // { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'openevent', component: OpeneventComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'admin-manage-volunteer', component: AdminManageVolunteerComponent},
  // { path: 'admin-dashboard', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: 'admin-manage-event', loadChildren: () => import('./admin-dashboard/admin-manage-event/admin-manage-event.module').then(m => m.AdminManageEventModule) },
  // { path: 'admin-manage-volunteer', loadChildren: () => import('./admin-dashboard/admin-manage-volunteer/admin-manage-volunteer.module').then(m => m.AdminManageVolunteerModule) },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'confirm-password', loadChildren: () => import('./reset-password/confirm-password/confirm-password.module').then(m => m.ConfirmPasswordModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
