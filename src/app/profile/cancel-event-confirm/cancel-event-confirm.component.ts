import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'src/app/_services/event.service';
import { SnackBarMessageComponent } from 'src/app/snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-cancel-event-confirm',
  templateUrl: './cancel-event-confirm.component.html',
  styleUrls: ['./cancel-event-confirm.component.css'],
})
export class CancelEventConfirmComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private _snackBar: MatSnackBar
  ) {}

  canncel_event: any;
  durationInSeconds = 5;

  ngOnInit(): void {
    let data: any = localStorage.getItem('EVENT');
    this.canncel_event = JSON.parse(data);
  }

  cancle_activity() {
    this.eventService
      .cancel_activity(
        this.canncel_event.currentActivityId,
        this.canncel_event.currentUserID,
        this.canncel_event.cancelDate
      )
      .subscribe({
        next: (test) => {
          console.log(test.date);
        },
      });

    let message = { text: 'ยกเลิกสำเร็จ' };
    localStorage.setItem('MESSAGE', JSON.stringify(message));
    this._snackBar.openFromComponent(SnackBarMessageComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
