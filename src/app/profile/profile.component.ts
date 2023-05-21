import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tabs: number = 0;

  public C1: User_show[] = [];
  currentUser: any;
  check_activity: any[] = [];
  pagedDataArray: any[] = [];
  currentPage: number = 0;
  pageSize: number = 3;
  totalItems: number = 0;
  history_activity: any;
  show_check_activity: any;
  date_con: any;
  status: any;
  currentActivity: any;
  isLoggedIn = false;
  isBlacklist = true;
  

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
        this.pagedData();
      });
    }
  }

  handlePageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedDataArray = this.check_activity.slice(startIndex, endIndex);
    this.currentPage = event.pageIndex;
  }

  pagedData(): any[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    if (this.check_activity) {
      return this.check_activity.slice(startIndex, endIndex);
    }
    return [];
  }

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

      const initialPageEvent = { pageIndex: 0, pageSize: 3 } as PageEvent;
      this.handlePageChange(initialPageEvent);
  }

  getDataUserActivity(): void {
    this.http
      .get<any[]>('http://localhost:8000/users/get-useractivity')
      .subscribe((response) => {
        this.check_activity = response;
        this.totalItems = this.check_activity.length;
        this.handlePageChange({ pageIndex: this.currentPage, pageSize: this.pageSize });
      });
  }


  blackListLabel(x: boolean) {
    if (x == false) {
      this.isBlacklist = false;
    }
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
    currentUserActivityId: number,
    currentActivityId: number,
    currentActivityName: string,
    currentUserID: number,
    currentUserName: string
  ) {
    this.dialog.open(PostCommentComponent);

    let data = {
      currentUserActivityId,
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
