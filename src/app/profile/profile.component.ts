import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';
import { User_show } from './profile-request-get';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public C1: User_show[] = [];
  currentUser: any;

  constructor(private http:HttpClient,private storageService: StorageService) { 
    
  }
  
  ngOnInit(): void {
    // this.currentUser = this.storageService.getUser();
    this.http.get('http://localhost:8000/users/user')
    .subscribe(response => {
      this.currentUser = response;
      console.warn("result",response)
    })
  }
}
