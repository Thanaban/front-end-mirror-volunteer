import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { SlideInterface } from '../image-slider/slide.interface';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allUser: any;

  content?: string;
  slides: SlideInterface[] = [
    { url: '../../assets/image/2.jpg', title: '1' },
    { url: '../../assets/image/5.jpg', title: '1' },
    { url: '../../assets/image/14.jpg', title: '1' },
  ];

  constructor(private userService: UserService, private http: HttpClient) {}
  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    console.warn('ress');
    this.http
      .get('https://api.volunteerm.online/activities/get_user_for_competition')
      .subscribe(
        (response) => {
          this.allUser = response;
          console.warn('result', this.allUser.received_hours.sort());
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );

    this.userService.getPublicContent().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err) => {
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
      },
    });
  }
}
