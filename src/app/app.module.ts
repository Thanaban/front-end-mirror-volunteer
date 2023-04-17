import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { OpeneventComponent } from './openevent/openevent.component';
import { OpeneventModule } from './openevent/openevent.module';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalEventComponent } from './openevent/modal-event/modal-event.component';
import { JoinEventComponent } from './openevent/join-event/join-event.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCommonModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { GoogleMapsModule } from '@angular/google-maps'
import {MatButtonModule} from '@angular/material/button';
import { DetailActivityComponent } from './profile/detail-activity/detail-activity.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ImageSliderModule } from './image-slider/image-slider.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditEventDetailComponent } from './admin-dashboard/admin-manage-event/edit-event-detail/edit-event-detail.component';
import { MatTableModule } from '@angular/material/table';

import {MatGridListModule} from '@angular/material/grid-list';
import { PostCommentComponent } from './profile/post-comment/post-comment.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SuccessJoinEventComponent } from './openevent/success-join-event/success-join-event.component';
import { AppServerComponent } from './app-server/app-server.component';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AdminManageVolunteerComponent } from './admin-dashboard/admin-manage-volunteer/admin-manage-volunteer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BlacklistSnackBarComponent } from './admin-dashboard/Snack-bar/blacklist-snack-bar/blacklist-snack-bar.component';
import { AdminVolunteerListComponent } from './admin-dashboard/admin-volunteer-list/admin-volunteer-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    JoinEventComponent,
    ModalEventComponent,
    DetailActivityComponent,
    EditEventDetailComponent,
    PostCommentComponent,
    AppServerComponent,
    AdminDashboardComponent,
    AdminManageVolunteerComponent,
    BlacklistSnackBarComponent,
    AdminVolunteerListComponent
  ],
  entryComponents:[
    ModalEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    MatCommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    GoogleMapsModule,
    MatButtonModule,
    ImageSliderModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgIf,
    MatTabsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule,

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
