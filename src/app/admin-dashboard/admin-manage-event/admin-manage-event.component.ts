import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event_show } from '../../openevent/openevent-request-get';
import { EventService } from 'src/app/_services/event.service';
import { EditEventDetailComponent } from './edit-event-detail/edit-event-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-manage-event',
  templateUrl: './admin-manage-event.component.html',
  styleUrls: ['./admin-manage-event.component.css'],
})
export class AdminManageEventComponent implements OnInit {
  panelOpenState = false;
  eventlist: Event_show[] = [];
  status: any;

  isChecked: any;
  form: any = {
    status_event: null,
  };

  constructor(
    private http: HttpClient,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEventList();
  }

  event_status(x: boolean) {
    if (x == true) {
      this.status = 'เปิดรับสมัคร';
    } else {
      this.status = 'ปิดรับสมัคร';
    }
  }

  update_event_status(currentEventId: number, currentEventStatus: boolean) {
    this.eventService
      .status_activity(currentEventId, currentEventStatus)
      .subscribe({
        next: (test) => {},
      });
  }

  openDialogEditDetail(currentActivityId: number) {
    const dialogRef = this.dialog.open(EditEventDetailComponent);
  
    let data = { currentActivityId };
    localStorage.setItem('EVENT', JSON.stringify(data));
  
    dialogRef.afterClosed().subscribe(() => {
      this.loadEventList();
    });
  }
  
  openDialogaAddEvent() {
    const dialogRef = this.dialog.open(AddEventComponent);
  
    dialogRef.afterClosed().subscribe(() => {
      this.loadEventList();
    });
  }
  
  loadEventList() {
    this.http
      .get<Event_show[]>('https://api.volunteerm.online/users/activities')
      .subscribe((response) => {
        this.eventlist = response;
        console.warn('result', response);
      });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
