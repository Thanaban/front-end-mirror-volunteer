import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  event_all:any
  userAc = {} as any[]

  constructor(private http:HttpClient){
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/activities/get_lated_activity')
    .subscribe(response => {
      this.event_all = response;
      console.log("result",this.event_all)
      console.log("result",this.event_all[16].userId.length)
      for (let i = 0; i < this.event_all.length;i++){
        this.userAc.push(this.event_all[i]);
        console.warn(i,this.userAc)
      }
    })
  }

  check_emtry(x:number){
    if (x == 0){

    }
  }

}
