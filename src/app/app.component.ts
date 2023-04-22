import { Component } from '@angular/core';
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

  // slides = [
  //   { url:"../../assets/image/1.jpg", title: '1'},
  //   { url:"../../assets/image/2.jpg", title: '1'}
  // ]

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
      // this.roles = user.roles;

      this.currentUser = this.storageService.getUser();
      this.http
        .get('http://localhost:8000/users/user')
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

      // console.warn(this.currentUser)
      // console.log(this.currentUser.id)

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      // this.username = user.name;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
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
