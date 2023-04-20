import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-confirm-edit-volunteer-list',
  templateUrl: './confirm-edit-volunteer-list.component.html',
  styleUrls: ['./confirm-edit-volunteer-list.component.css'],
})
export class ConfirmEditVolunteerListComponent implements OnInit {
  userActivityId: any;
  userId: any;

  constructor(
    private eventService: EventService,
    public dialogRef: MatDialogRef<ConfirmEditVolunteerListComponent>
  ) {}

  ngOnInit(): void {
    let datauser: any = localStorage.getItem('REMOVEVOLUNTEERLIST');
    this.userId = JSON.parse(datauser);
    let data: any = localStorage.getItem('ADMINEVENT');
    this.userActivityId = JSON.parse(data);
  }
  

  remove_user(userId: number) {
    this.eventService
      .remove_user_from_useractivity(
        userId,
        this.userActivityId.currentActivityId
      )
      .subscribe({
        next: (data) => {
          console.log('test', data);
        },
      });

    console.warn(
      'remove success',
      userId,
      this.userActivityId.currentActivityId
    );
    this.dialogRef.close();

  }
}
