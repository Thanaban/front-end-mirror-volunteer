import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/_services/event.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlacklistSnackBarComponent } from '../Snack-bar/blacklist-snack-bar/blacklist-snack-bar.component';

@Component({
  selector: 'app-admin-manage-volunteer',
  templateUrl: './admin-manage-volunteer.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  styleUrls: ['./admin-manage-volunteer.component.css'],
})
export class AdminManageVolunteerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  durationInSeconds = 5;
  currentUser: any;
  status: any;
  index: any;
  color_button = '#27A644';
  form: any = {
    status_event: null,
  };

  displayedColumns: string[] = ['position', 'name', 'weight', 'test', 'symbol'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private eventService: EventService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(userName: string, userLastName: string, userStatus: boolean) {
    let data = { userName, userLastName, userStatus };
    localStorage.setItem('MANAGEUSER', JSON.stringify(data));
    this._snackBar.openFromComponent(BlacklistSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.http
      .get('http://localhost:8000/activities/get_all_users')
      .subscribe((response) => {
        this.currentUser = response;
        this.dataSource = new MatTableDataSource(this.currentUser);
        this.index = this.currentUser.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.currentUser.non_blacklist == true) {
          this.status = 'ปกติ';
        } else {
          this.status = 'แบล็คลิสต์';
        }
      });
  }

  change_status(x: boolean) {
    if (x == true) {
      this.status = 'ปกติ';
      this.color_button = '#27A644';
    } else {
      this.status = 'แบล็คลิสต์';
      this.color_button = '#FF2626';
    }
  }

  update_user_status(currentUserId: number, currentUserStatus: boolean) {
    this.eventService.status_user(currentUserId, currentUserStatus).subscribe({
      next: (test) => {},
    });
  }
}
