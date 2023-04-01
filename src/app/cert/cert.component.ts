import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
import { CertRoutingModule } from './cert-routing.module';
import { Observable } from 'rxjs';
import { toJpeg } from 'html-to-image';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cert',
  templateUrl: './cert.component.html',
  styleUrls: ['./cert.component.css']
})
export class CertComponent implements OnInit { 
  eventlist: any;
  currentUser: any;
  body: any;
  nameActivity: any;
  nameASA: any;
  date: any;

  constructor(
    private http: HttpClient, 
    private storageService: StorageService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { nameActivity: string , date: string }
  ) { 
    this.nameActivity = data.nameActivity;
    this.date = data.date;
  }
  
  ngOnInit(): void {
    this.http.get('http://localhost:8000/users/activities')
      .subscribe(response => {
        this.eventlist = response;
        console.warn("result", response);
      });
    
    this.http.get('http://localhost:8000/users/user')
      .subscribe(response => {
        this.currentUser = response;
        console.warn("result", this.currentUser);
        this.nameASA = `${this.currentUser.name} - ${this.currentUser.lastname}`
      });
  }
}
