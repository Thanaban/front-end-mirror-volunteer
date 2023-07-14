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
    this.http
      .get<Event_show[]>('https://api.volunteerm.online/users/activities')
      .subscribe((response) => {
        this.eventlist = response;
        console.warn('result', response);
      });
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
    this.dialog.open(EditEventDetailComponent);

    let data = { currentActivityId };
    localStorage.setItem('EVENT', JSON.stringify(data));
  }

  openDialogaAddEvent() {
    this.dialog.open(AddEventComponent);
  }

  async AddEvent() {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        if (input1 && input2) {
          return [
            input1.value,
            input2.value
          ];
        }
        return null;
      }
    });
  
    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
