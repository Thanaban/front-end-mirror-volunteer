import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { SlideInterface } from '../image-slider/slide.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  content?: string;
  slides: SlideInterface[]= [
    { url:"../../assets/image/2.jpg", title: '1'},
    { url:"../../assets/image/5.jpg", title: '1'},
    { url:"../../assets/image/14.jpg", title: '1'}
  ]

  constructor(private userService: UserService) { 
    
  }
  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
  
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

  
  
}
