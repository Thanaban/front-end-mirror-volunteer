import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Event_show} from '../../../openevent/openevent-request-get'
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{


  form: any = {
    id: null,
    activity_name: null,
    activity_details: null,
    clothes_detail: null,
    etc_detail: null,
    time_detail:null,
    timeline:null,
    travel_detail:null,
    travel_etc_detail:null,
    travel_public_detail:null,
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

  constructor(private eventService:EventService){}

  ngOnInit(): void {
    
    
    
  }

  onSubmit(): void {
    const { 
      activity_name,
      activity_details,
      clothes_detail,
      etc_detail,
      time_detail,
      timeline,
      travel_detail,
      travel_etc_detail,
      travel_public_detail,
      regised_number,
      size_number,
      received_hours,
      map,
      start_date,
      end_date,
      is_open,
      picture,
      priority,
    } = this.form;

    this.eventService.create_activity(
      activity_name,
      activity_details,
      clothes_detail,
      etc_detail,
      time_detail,
      timeline,
      travel_detail,
      travel_etc_detail,
      travel_public_detail,
      regised_number,
      size_number,
      received_hours,
      map,
      start_date,
      end_date,
      picture,
      priority, ).subscribe({
      next: data => {
        
      },
      error: err => {
       
      }
      
    })
    this.reloadPage()
    
  }
  reloadPage(): void {
    window.location.reload();
  }
}
