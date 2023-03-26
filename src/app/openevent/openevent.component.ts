import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Event_show } from './openevent-request-get';
import {MatDialog} from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { JoinEventComponent } from './join-event/join-event.component';
import { Observable } from 'rxjs';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-openevent',
  templateUrl: './openevent.component.html',
  styleUrls: ['./openevent.component.css']
})
export class OpeneventComponent implements OnInit{


  currentUser: any;
  eventlist: Event_show[]=[];
  event_open: any;
  select_join_event: any;
  currentUserID:any
  currentUserName:any

  constructor(
    private http:HttpClient,
    public dialog: MatDialog,
    ) { 
    
  }

  ngOnInit(): void {
    // this.currentUser = this.storageService.getUser();
    this.http.get<Event_show[]>('http://localhost:8000/users/activities')
    .subscribe(response => {
      this.eventlist = response;
      console.warn("result",response)
    })
    
    this.http.get('http://localhost:8000/users/user')
    .subscribe(response => {
      this.currentUser = response;
      console.warn("result",this.currentUser)
      })
  }
  
  openDialog() {
    
    this.dialog.open(ModalEventComponent);
    
  }
  

  openDialog2(currentEventID:number,currentEventName:string,currentUserID:number,currentUserName:string) {
    
    

    let data = {currentEventID,currentEventName,currentUserID,currentUserName};
    localStorage.setItem('EVENT',JSON.stringify(data))

    console.warn(
      'ID event:'+currentEventID,
      'ID user:'+this.currentUser.id);
    
    this.dialog.open(JoinEventComponent);
    this.http.get('http://localhost:8000/activities/getoneid/'+(currentEventID))
    .subscribe(response => {
      console.warn("result",response)
    })
  
    // return this.http.post('http://localhost:8000/users/dateAc2',{})
  }
  
  join_event(activityId: number, userId: number,date: Date): Observable<any> {
    return this.http.post('http://localhost:8000/users/dateAc2',
      {
        activityId,
        userId,
        date
      },
      httpOptions
    );
  }

  // update2(i: any){
  //   console.log(i);
  // }

}
