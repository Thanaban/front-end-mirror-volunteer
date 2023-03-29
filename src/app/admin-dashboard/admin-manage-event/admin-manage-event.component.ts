import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Event_show } from '../../openevent/openevent-request-get';
import { EventService } from 'src/app/_services/event.service';
import { EditEventDetailComponent} from './edit-event-detail/edit-event-detail.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-manage-event',
  templateUrl: './admin-manage-event.component.html',
  styleUrls: ['./admin-manage-event.component.css']
})
export class AdminManageEventComponent implements OnInit {
  panelOpenState = false;
  eventlist: Event_show[]=[];
  status:any
  

  isChecked :any
  form: any = {
    status_event:null
  };

  constructor(
    private http:HttpClient,
    private eventService:EventService,
    public dialog: MatDialog
    ) { 
    
  }

  ngOnInit(): void {
    this.http.get<Event_show[]>('http://localhost:8000/users/activities')
    .subscribe(response => {
      this.eventlist = response;
      console.warn("result",response)
      
    })
  }

  event_status(x : boolean){
    if (x == true) {
      this.status = "เปิดรับสมัคร"
    } else {
      this.status = "ปิดรับสมัคร"
    }
  }

  update_event_status(currentEventId:number,currentEventStatus:boolean){
    
    this.eventService.status_activity(currentEventId,currentEventStatus).subscribe({
      next: test => {
        // console.log(currentEventId);
      },
    
    });
    // this.reloadPage()
  }

  openDialogEditDetail(currentActivityId:number) {
    this.dialog.open(EditEventDetailComponent);

    let data = {currentActivityId};
    localStorage.setItem('EVENT',JSON.stringify(data))
    
  }

  reloadPage(): void {
    window.location.reload();
  }
}
