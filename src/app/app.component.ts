import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Express } from 'express';
import { Server } from 'http';
import { createServer } from 'https';
import { readFileSync } from 'fs';
// import cors from 'cors';
import { BodyParser } from 'body-parser';
import { Socket } from 'socket.io';
import { EventService } from './_services/event.service';
import { data } from 'cypress/types/jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  isAdmin = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  currentUser: any;
  showFiller = false;
  eventTomorrow: any;
  userActivityTomorrow: number = 0;
  tettte: any;
  listUserActivityTomorrow = [] as any;
  dateForm: any;
  month: any;
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private http: HttpClient,
    private router: Router,
    private eventService: EventService
  ) {
    this.storageService.getToken();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
      // this.roles = user.roles;

      this.currentUser = this.storageService.getUser();
      console.warn(this.currentUser.result.name);
      this.http
        .get('https://api.volunteerm.online/users/user')
        .subscribe((response) => {
          this.currentUser = response;
          console.warn('result', this.currentUser);
          if (this.currentUser.admin) {
            this.isAdmin = this.currentUser.admin;
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', this.isAdmin);
          } else {
            this.isAdmin = this.currentUser.admin;
            console.warn('BBBBBBBBBBBBBBBBBBBBBBB', this.isAdmin);
          }
        });

      this.http
        .get('https://api.volunteerm.online/activities/notify_user')
        .subscribe((data) => {
          this.eventTomorrow = data;
          
          console.warn(data);
          for (let i = 0; i < this.eventTomorrow.length; i++) {
            this.eventTomorrow[i].date = this.con_date(this.eventTomorrow[i].date)
            this.eventTomorrow[i].detail = "คุณมีกิจกรรม อาสาจัดเต็ม ที่ต้องทำในวันที่ "+ this.eventTomorrow[i].date
            console.warn('i lenght', this.eventTomorrow[i].detail);

            console.warn('i lenght', this.eventTomorrow[i].userId);
            console.warn('i', i);


            // this.eventService
            //   .get_one_activity(this.eventTomorrow[i].activityId)
            //   .subscribe({
            //     next: (data) => {
            //       console.warn('data', data);
            //       this.eventTomorrow[i].push(data.activity_name)
            //       this.eventTomorrow[i].date = this.con_date(this.eventTomorrow[i].date)
            //       console.warn('ssss', this.eventTomorrow[i].date);
            //       data.date = this.con_date(data.date);
            //       this.tettte = data;
            //       console.warn('ssss', this.tettte.date);
            //       this.listUserActivityTomorrow.push(this.tettte);
            //       let dad = this.listUserActivityTomorrow;
            //       console.warn('uuuuu', this.listUserActivityTomorrow);
            //     },
            //   });
            // for (let j = 0; j < this.eventTomorrow[i].userId.length; j++) {
            //   console.warn('j', j);
            //   if ((this.eventTomorrow[i].userId[j] = this.currentUser.id)) {
            //     this.userActivityTomorrow = this.userActivityTomorrow + 1;
            //     this.eventTomorrow[i].date = this.con_date(
            //       this.eventTomorrow[i].date
            //     );
            //     console.warn('asagg');

            //   this.eventService
            //     .get_useractivity_by_id(this.eventTomorrow[i].id)
            //     .subscribe({
            //       next: (data) => {
            //         data.date = this.con_date(data.date);
            //         this.tettte = data;
            //         console.warn('ssss', this.tettte.date);
            //         this.listUserActivityTomorrow.push(this.tettte);
            //         let dad = this.listUserActivityTomorrow;
            //         console.warn('uuuuu', this.listUserActivityTomorrow);
            //       },
            //     });
            // // }
            // }
          }
        });

      // this.eventService.notifyUser(this.currentUser.id).subscribe({
      //   next: (data) => {
      //     this.eventTomorrow = data;
      //     console.warn(data);
      //   },
      // });

      // this.http
      //   .post(
      //     'https://api.volunteerm.online/activities/notify_user',this.currentUser.id
      //   )
      //   .subscribe((data) => {
      //     this.eventTomorrow = data;
      //     console.warn(data)
    }

    // this.eventBusSub = this.eventBusService.on('logout', () => {
    //   this.logout();
    // });
  }

  con_date(d: any) {
    d = d.split('-');
    this.month = d[1];
    if (d[1] == '04') {
      d[1] = 'เม.ย';
    } else if (d[1] == '05') {
      d[1] = 'พ.ค';
    } else if (d[1] == '06') {
      d[1] = 'มิ.ย';
    } else if (d[1] == '07') {
      d[1] = 'ก.ค';
    } else if (d[1] == '08') {
      d[1] = 'ส.ค';
    } else if (d[1] == '09') {
      d[1] = 'ก.ย';
    } else if (d[1] == '10') {
      d[1] = 'ต.ค';
    } else if (d[1] == '11') {
      d[1] = 'พ.ย';
    } else if (d[1] == '12') {
      d[1] = 'ธ.ค';
    } else if (d[1] == '01') {
      d[1] = 'ม.ค';
    } else if (d[1] == '02') {
      d[1] = 'ก.พ';
    } else if (d[1] == '03') {
      d[1] = 'มี.ค';
    }

    d[2] = parseInt(d[2]) + 543;
    // this.dateForm = d.reverse().join(' ');
    return this.dateForm;
  }

  notification_bell(): void {
    localStorage.setItem('TABS', JSON.stringify(1));
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        localStorage.clear();
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.navigate(['/home']);
  }
}
