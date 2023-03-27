import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event_show } from '../openevent-request-get';
import { OpeneventComponent } from '../openevent.component';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.css']
})
export class JoinEventComponent implements OnInit{

  form: any = {
    date: null,
  };

  @ViewChild(OpeneventComponent)

  eventlist1: Event_show[]=[];
  event_open: any;
  join_event: any;

  constructor(private http:HttpClient,private eventService:EventService) { 
  
  }

  ngOnInit(): void {
    
    let data:any = localStorage.getItem('EVENT');
    this.join_event = JSON.parse(data);
    console.log(this.join_event.currentEventID,this.join_event.currentEventName,this.join_event.currentUserID,this.join_event.currentUserName)
  }

  onSubmit(): void {
    const {date} = this.form;

    this.eventService.join_activity( this.join_event.currentEventID,this.join_event.currentUserID,date ).subscribe({
      next: test => {
        console.log(test.date);
      },
    
    });
    localStorage.removeItem('EVENT');
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
  
}
