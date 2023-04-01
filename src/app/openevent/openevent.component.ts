import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event_show } from './openevent-request-get';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { JoinEventComponent } from './join-event/join-event.component';
import { Observable } from 'rxjs';
import { CertComponent } from '../cert/cert.component';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-openevent',
  templateUrl: './openevent.component.html',
  styleUrls: ['./openevent.component.css']
})
export class OpeneventComponent implements OnInit {


  currentUser: any;
  eventlist: Event_show[] = [];
  event_open: any;
  select_join_event: any;
  currentUserID: any
  nameActivity: any
  date: any
  yearth: any
  month: any
  newDateStr:any
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    // this.currentUser = this.storageService.getUser();
    this.http.get<Event_show[]>('http://localhost:8000/users/activities')
      .subscribe(response => {
        this.eventlist = response;
        console.warn("result", response)
      })

    this.http.get('http://localhost:8000/users/user')
      .subscribe(response => {
        this.currentUser = response;
        console.warn("result", this.currentUser)
      })




  }

  openDialog() {

    this.dialog.open(ModalEventComponent);

  }


  openDialog2(currentEventID: number, currentUserID: number) {



    let data = { currentEventID, currentUserID };
    localStorage.setItem('EVENT', JSON.stringify(data))

    console.warn(
      'ID event:' + currentEventID,
      'ID user:' + this.currentUser.id);

    this.dialog.open(JoinEventComponent);
    this.http.get('http://localhost:8000/activities/getoneid/' + (currentEventID))
      .subscribe(response => {
        console.warn("result", response)
      })

    // return this.http.post('http://localhost:8000/users/dateAc2',{})
  }
  get_cert(id: number): Observable<any> {
    return this.http.post('http://localhost:8000/users/certify', { id: id });
  }

  Print(id: number): void {
   
    this.get_cert(id).subscribe(
      (response) => {
        this.nameActivity = response.userActivityName;
        this.date = response.date;
        if (this.nameActivity == undefined) {
          alert('กิจกรรมยังไม่จบน้าจ๊า')
        } else {
          const Date = (this.date).split("-"); // split the string into parts
          this.month = Date[1]
          this.yearth = parseInt(Date[0], 10) + 543
      
          if (this.month == "01") {
            this.month = "มกราคม"
          } else if (this.month == "02") {
            this.month = "กุมภาพันธ์"
          } else if (this.month == "03") {
            this.month = "มีนาคม"
          } else if (this.month == "04") {
            this.month = "เมษายน"
          } else if (this.month == "05") {
            this.month = "พฤษภาคม"
          } else if (this.month == "06") {
            this.month = "มิถุนายน"
          } else if (this.month == "07") {
            this.month = "กรกฎาคม"
          } else if (this.month == "08") {
            this.month = "สิงหาคม"
          } else if (this.month == "09") {
            this.month = "กันยายน"
          } else if (this.month == "10") {
            this.month = "ตุลาคม"
          } else if (this.month == "11") {
            this.month = "พฤศจิกายน"
          } else if (this.month == "12") {
            this.month = "ธันวาคม"
          }
          this.newDateStr = (`วันที่ ${ Date[2] } ${ this.month } พ.ศ.${ this.yearth }`);
          this.dialog.open(CertComponent, {
            data: {
              nameActivity: this.nameActivity,
              date: this.newDateStr
            }
          });
        }

      },
    );
  }

  join_event(activityId: number, userId: number, date: Date): Observable<any> {
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
