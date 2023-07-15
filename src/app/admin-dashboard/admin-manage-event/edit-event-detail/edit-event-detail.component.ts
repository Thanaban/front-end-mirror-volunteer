import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event_show } from '../../../openevent/openevent-request-get';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-edit-event-detail',
  templateUrl: './edit-event-detail.component.html',
  styleUrls: ['./edit-event-detail.component.css'],
})
export class EditEventDetailComponent implements OnInit {
  form: any = {};

  event: any;
  detail: any;
  eventlist: Event_show[] = [];
  activityId: any;

  constructor(private http: HttpClient, private eventService: EventService) {}

  ngOnInit(): void {
    let data: any = localStorage.getItem('EVENT');
    this.event = JSON.parse(data);
    this.activityId = this.event.currentActivityId;
    console.log('activityId' + this.event.currentActivityId);
    this.eventService.get_one_activity(this.event.currentActivityId).subscribe({
      next: (data) => {
        console.warn('data', data);
        this.form = { ...data };
      },
      error: (err) => {},
    });
  }

  updateActivity() {
    if (this.form) {
      this.eventService
        .update_activity(
          this.form.activity_name,
          this.form.activity_details,
          this.form.size_number,
          this.form.received_hours,
          this.form.map,
          this.form.start_date,
          this.form.end_date,
          this.form.is_open,
          this.form.picture,
          this.form.priority,
          this.form.time_detail,
          this.form.clothes_detail,
          this.form.etc_detail,
          this.form.travel_detail,
          this.form.travel_public_detail,
          this.form.travel_etc_detail
        )
        .subscribe({
          next: (response) => {
            console.log('Activity updated successfully:', response);
            // Perform any additional actions after the activity is updated
          },
          error: (error) => {
            console.error('Error updating activity:', error);
            // Handle any errors that occur during the update process
          },
        });
    }
  }

  // onSubmit(): void {
  //   const {
  //     id,
  //     activity_name,
  //     time_detail,
  //     clothes_detail,
  //     map,
  //     travel_public_detail,
  //     travel_detail,
  //     travel_etc_detail,
  //   } = this.form;

  //   this.eventService
  //     .update_activity(
  //       this.activityId,
  //       activity_name,
  //       time_detail,
  //       clothes_detail,
  //       map,
  //       travel_public_detail,
  //       travel_detail,
  //       travel_etc_detail
  //     )
  //     .subscribe({
  //       next: (data) => {},
  //       error: (err) => {},
  //     });
  //   this.reloadPage();
  // }
  reloadPage(): void {
    window.location.reload();
  }
}
