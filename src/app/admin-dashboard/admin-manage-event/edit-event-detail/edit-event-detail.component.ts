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
  form: any = {
    activity_name: null,
    time_detail: null,
    clothes_detail: null,
    map: null,
    travel_public_detail: null,
    travel_detail: null,
    travel_etc_detail: null,
  };

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
    this.http
      .get<Event_show[]>(
        'http://localhost:8000/activities/getoneid/' +
          this.event.currentActivityId
      )
      .subscribe((response) => {
        this.detail = response;
        console.warn('result', response);
      });
  }

  onSubmit(): void {
    const {
      id,
      activity_name,
      time_detail,
      clothes_detail,
      map,
      travel_public_detail,
      travel_detail,
      travel_etc_detail,
    } = this.form;

    this.eventService
      .update_activity(
        this.activityId,
        activity_name,
        time_detail,
        clothes_detail,
        map,
        travel_public_detail,
        travel_detail,
        travel_etc_detail
      )
      .subscribe({
        next: (data) => {},
        error: (err) => {},
      });
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
  }
}
