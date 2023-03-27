import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.css']
})
export class DetailActivityComponent implements OnInit{

  cancel_event: any

  constructor(private http:HttpClient,private eventService:EventService) { 
  
  }

  ngOnInit(): void {
    
    let data:any = localStorage.getItem('EVENT');
    this.cancel_event = JSON.parse(data);
    console.log(
      "activityId"+this.cancel_event.currentActivityId,
      this.cancel_event.currentActivityName,
      "userId"+this.cancel_event.currentUserID,
      this.cancel_event.currentUserName,
      this.cancel_event.cancelDate
      )
  }

  onSubmit(): void {
    

    this.eventService.cancel_activity( this.cancel_event.currentActivityId,this.cancel_event.currentUserID,this.cancel_event.cancelDate ).subscribe({
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
