import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';
import { User_show } from './profile-request-get';
import { EventService } from '../_services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { CancelEventConfirmComponent } from './cancel-event-confirm/cancel-event-confirm.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  tabs: number = 0;

  public C1: User_show[] = [];
  currentUser: any;
  check_activity: any;
  history_activity: any;
  show_check_activity: any;
  date_con: any;
  status: any;
  currentActivity: any;
  isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    let data: any = localStorage.getItem('TABS');
    this.tabs = data;
    localStorage.removeItem('TABS');
    this.http.get('http://localhost:8000/users/user').subscribe((response) => {
      this.currentUser = response;
      if (this.currentUser.non_blacklist == true) {
        this.status = 'ปกติ';
      } else {
        this.status = 'แบล็คลิสต์';
      }
    });

    this.getDataUserActivity();

    this.http
      .get('http://localhost:8000/users/get-ended-useractivity')
      .subscribe((response4) => {
        this.history_activity = response4;
      });
  }

  getDataUserActivity() {
    this.http
      .get('http://localhost:8000/users/get-useractivity')
      .subscribe((response2) => {
        this.check_activity = response2;
        for (let i of this.check_activity) {
          this.date_con = i.date.split('-').reverse().join('-');
          console.warn('activityId:', this.date_con);
          this.http
            .get('http://localhost:8000/activities/getoneid/' + i.activityId)
            .subscribe((response3) => {
              this.show_check_activity[i] = response3;
              console.warn('result3', response3);
            });
        }
      });
  }

  con_date(d: any) {
    d = d.split('-').reverse().join('-');
    return d;
  }

  cancle_activity(
    currentActivityId: number,
    currentActivityName: string,
    currentUserID: number,
    currentUserName: string,
    cancelDate: Date
  ) {
    this.eventService
      .cancel_activity(currentActivityId, currentUserID, cancelDate)
      .subscribe({
        next: (test) => {
          console.log(test.date);
        },
      });
  }

  openDialogCancel(
    currentActivityId: number,
    currentActivityName: string,
    currentUserID: number,
    currentUserName: string,
    cancelDate: Date
  ) {
    this.dialog
      .open(CancelEventConfirmComponent)
      .afterClosed()
      .subscribe((result) => {
        this.getDataUserActivity();
      });

    let data = {
      currentActivityId,
      currentActivityName,
      currentUserID,
      currentUserName,
      cancelDate,
    };
    localStorage.setItem('EVENT', JSON.stringify(data));
  }

  openDialogDetail(
    currentActivityId: number,
    currentActivityName: string,
    currentUserID: number,
    currentUserName: string,
    cancelDate: Date
  ) {
    this.dialog.open(DetailActivityComponent);

    let data = {
      currentActivityId,
      currentActivityName,
      currentUserID,
      currentUserName,
      cancelDate,
    };
    localStorage.setItem('EVENT', JSON.stringify(data));
  }

  openDialogComment(
    currentActivityId: number,
    currentActivityName: string,
    currentUserID: number,
    currentUserName: string
  ) {
    this.dialog.open(PostCommentComponent);

    let data = {
      currentActivityId,
      currentActivityName,
      currentUserID,
      currentUserName,
    };
    localStorage.setItem('EVENT', JSON.stringify(data));
  }

  reloadPage(): void {
    window.location.reload();
  }
}
