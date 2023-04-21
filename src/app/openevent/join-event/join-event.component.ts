import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event_show } from '../openevent-request-get';
import { OpeneventComponent } from '../openevent.component';
import { EventService } from 'src/app/_services/event.service';
import { SuccessJoinEventComponent } from '../success-join-event/success-join-event.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from 'src/app/snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.css'],
})
export class JoinEventComponent implements OnInit {
  durationInSeconds = 5;

  form: any = {
    date: null,
  };

  @ViewChild(OpeneventComponent)
  eventlist1: Event_show[] = [];
  event_open: any;
  join_event: any;
  minDate: Date;
  maxDate: Date;

  constructor(
    private http: HttpClient,
    private eventService: EventService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    let data: any = localStorage.getItem('EVENT');
    this.join_event = JSON.parse(data);
    console.log(
      this.join_event.currentEventID,
      this.join_event.currentEventName,
      this.join_event.currentUserID,
      this.join_event.currentUserName
    );
  }

  onSubmit(): void {
    const { date } = this.form;

    this.eventService
      .join_activity(
        this.join_event.currentEventID,
        this.join_event.currentUserID,
        date
      )
      .subscribe({
        next: (test) => {
          console.log(test.date);
        },
      });
    let message = { text: 'ลงทะเบียนสำเร็จ' };
    localStorage.setItem('MESSAGE', JSON.stringify(message));
    this._snackBar.openFromComponent(SnackBarMessageComponent, {
      duration: this.durationInSeconds * 1000,
    });
    this.dialog.open(SuccessJoinEventComponent);
  }

  openDialog3() {
    this.dialog.open(SuccessJoinEventComponent);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
