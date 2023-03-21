import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event_show } from './openevent-request-get';


@Component({
  selector: 'app-openevent',
  templateUrl: './openevent.component.html',
  styleUrls: ['./openevent.component.css']
})
export class OpeneventComponent implements OnInit{



  eventlist: Event_show[]=[];
  event_open: any;

  constructor(private http:HttpClient,) { 
    
  }

  ngOnInit(): void {
    // this.currentUser = this.storageService.getUser();
    this.http.get<Event_show[]>('http://localhost:8000/users/test')
    .subscribe(response => {
      this.eventlist = response;
      console.warn("result",response)
    })
  }

  
}
