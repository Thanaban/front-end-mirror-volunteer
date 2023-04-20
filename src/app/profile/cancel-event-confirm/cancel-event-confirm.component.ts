import { Component,OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-cancel-event-confirm',
  templateUrl: './cancel-event-confirm.component.html',
  styleUrls: ['./cancel-event-confirm.component.css']
})
export class CancelEventConfirmComponent implements OnInit{

  constructor(private eventService:EventService){}

  canncel_event:any

  ngOnInit(): void {
    let data:any = localStorage.getItem('EVENT');
    this.canncel_event = JSON.parse(data);
  }

  cancle_activity(){
    this.eventService.cancel_activity(this.canncel_event.currentActivityId,this.canncel_event.currentUserID,this.canncel_event.cancelDate ).subscribe({
      next: test => {
        console.log(test.date);
      },
    });
    // this.reloadPage();
  }
  

}
