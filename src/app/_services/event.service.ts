import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  join_activity(activityId: number, userId: number,date: Date): Observable<any> {
    return this.http.post('http://localhost:8000/users/dateAc2',
      {
        activityId,
        userId,
        date
      },
      httpOptions
    );
  }

  cancel_activity(activityId: number, userId: number,date: Date): Observable<any> {
    return this.http.patch('http://localhost:8000/users/cancel_activity',
      {
        activityId,
        userId,
        date
      },
      httpOptions
    );
  }

  status_activity(id: number,is_open:boolean): Observable<any> {
    return this.http.patch('http://localhost:8000/activities/update_activity_status',
      {
        id,
        is_open
      },
      httpOptions
    );
  }

  update_activity(
    id :number,
    activity_name:string,
    time_detail:string,
    clothes_detail:string,
    map:string,
    travel_public_detail:string,
    travel_detail:string,
    travel_etc_detail:string 
    ): Observable<any> {
    return this.http.patch('http://localhost:8000/activities/update_activity',
      {
        id,
        activity_name,
      time_detail,
      clothes_detail,
      map,
      travel_public_detail,
      travel_detail,
      travel_etc_detail
      },
      httpOptions
    );
  }

  create_activity(
    activity_name:string,
      activity_details:string,
      clothes_detail:string,
      etc_detail:string,
      time_detail:string,
      timeline:string,
      travel_detail:string,
      travel_etc_detail:string,
      travel_public_detail:string,
      regised_number:number,
      size_number:number,
      received_hours:number,
      map:string,
      start_date:Date,
      end_date:Date,
      
      picture:string,
      priority:number
    ): Observable<any> {
    return this.http.post('http://localhost:8000/activities/createActivity',
      {
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
      priority,
      },
      httpOptions
    );
  }

  status_user(id: number,non_blacklist:boolean): Observable<any> {
    return this.http.patch('http://localhost:8000/activities/update_blacklist',
      {
        id,
        non_blacklist
      },
      httpOptions
    );
  }

}
