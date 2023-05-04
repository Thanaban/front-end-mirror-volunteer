import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event_show } from './openevent-request-get';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { JoinEventComponent } from './join-event/join-event.component';
import { Observable } from 'rxjs';
import { SuccessJoinEventComponent } from './success-join-event/success-join-event.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { PleaseLoginComponent } from './please-login/please-login.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'app-openevent',
  templateUrl: './openevent.component.html',
  styleUrls: ['./openevent.component.css'],
})
export class OpeneventComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private status: AppComponent,
    private router: Router
  ) {}

  panelOpenState = false;
  checklogin = this.status.isLoggedIn;
  currentUser: any;
  eventlist: Event_show[] = [];
  event_open: any;
  select_join_event: any;
  currentUserID: any;
  currentUserName: any;
  commentActivity: any;

  ngOnInit(): void {
    this.http
      .get<Event_show[]>('http://localhost:8000/activities/open_activity')
      .subscribe((response) => {
        this.eventlist = response;
        console.warn('result', response);
      });

    this.http.get('http://localhost:8000/users/user').subscribe((response) => {
      this.currentUser = response;
      console.warn('result', this.currentUser);
    });

    this.http
      .get('http://localhost:8000/activities/get_all_comment')
      .subscribe((response2) => {
        this.commentActivity = response2;
        console.warn('test', this.commentActivity[0].comment_detail);
      });
  }

  openDialog() {
    this.dialog.open(ModalEventComponent);
  }

  openDialogPleaseLogin() {
    // this.dialog.open(PleaseLoginComponent);
    Swal.fire({
      icon: 'warning',
      title: '<strong>เกิดข้อผิดพลาด!</strong>',
      html: 'โปรดเข้าสู่ระบบก่อนสมัครเข้าร่วม',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-sign-in"></i> เข้าสู่ระบบ',
      confirmButtonColor: '#27a644',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

  openDialog2(
    currentEventID: number,
    currentEventName: string,
    currentUserID: number,
    currentUserName: string
  ) {
    if (this.status.isLoggedIn) {
      console.warn('asdas', this.status.isLoggedIn);
      let data = {
        currentEventID,
        currentEventName,
        currentUserID,
        currentUserName,
      };
      localStorage.setItem('EVENT', JSON.stringify(data));

      console.warn(
        'ID event:' + currentEventID,
        'ID user:' + this.currentUser.id
      );

      this.dialog.open(JoinEventComponent);
      this.http
        .get('http://localhost:8000/activities/getoneid/' + currentEventID)
        .subscribe((response) => {
          console.warn('result', response);
        });
    } else {
      console.warn('sssssssasdas', this.status.isLoggedIn);
    }
  }

  join_event(activityId: number, userId: number, date: Date): Observable<any> {
    return this.http.post(
      'http://localhost:8000/users/dateAc2',
      {
        activityId,
        userId,
        date,
      },
      httpOptions
    );
  }
}
