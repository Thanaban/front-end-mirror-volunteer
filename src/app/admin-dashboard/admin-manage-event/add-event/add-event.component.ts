import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  form: any = {
    id: null,
    activity_name: null,
    activity_details: null,
    clothes_detail: null,
    etc_detail: null,
    time_detail: null,
    timeline: null,
    travel_detail: null,
    travel_etc_detail: null,
    travel_public_detail: null,
    regised_number: null,
    size_number: null,
    received_hours: null,
    map: null,
    start_date: null,
    end_date: null,
    is_open: null,
    picture: null,
    priority: null,
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  confirm_create() {
    const {
      activity_name,
      activity_details,
      size_number,
      received_hours,
      map,
      start_date,
      end_date,
      is_open,
      picture,
      priority,
      time_detail,
      clothes_detail,
      etc_detail,
      travel_detail,
      travel_public_detail,
      travel_etc_detail
    } = this.form;
  
    this.eventService.create_activity(
      activity_name,
      activity_details,
      size_number,
      received_hours,
      map,
      start_date,
      end_date,
      is_open,
      picture,
      priority,
      time_detail,
      clothes_detail,
      etc_detail,
      travel_detail,
      travel_public_detail,
      travel_etc_detail
    ).subscribe({
      next: (data) => {
        // Handle success
        console.log('Activity created successfully');
        this.reloadPage();
      },
      error: (err) => {
        // Handle error
        console.error('Error creating activity:', err);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}