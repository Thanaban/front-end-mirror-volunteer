import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event_show } from '../openevent-request-get';
import { OpeneventComponent } from '../openevent.component';
import { EventService } from 'src/app/_services/event.service';
import { SuccessJoinEventComponent } from '../success-join-event/success-join-event.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from 'src/app/snack-bar-message/snack-bar-message.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { result } from 'cypress/types/lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.css'],
})
export class JoinEventComponent implements OnInit {
  durationInSeconds = 5;
  myForm: FormGroup;

  form: any = {
    date: null,
  };

  @ViewChild(OpeneventComponent)
  eventlist1: Event_show[] = [];
  event_open: any;
  join_event: any;
  minDate: Date;
  maxDate: Date;
  currentDate: Date;

  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.currentDate = new Date();
    this.myForm = this.fb.group({
      date: [this.currentDate, Validators.required],
    });
  }

  ngOnInit(): void {
    const currentDate = new Date();
    console.log(this.minDate);
    let data: any = localStorage.getItem('EVENT');
    this.join_event = JSON.parse(data);
    console.log(
      this.join_event.currentEventID,
      this.join_event.currentEventName,
      this.join_event.currentUserID,
      this.join_event.currentUserName,
      this.join_event.endDate
    );
    this.maxDate = new Date(this.join_event.endDate);
  }

  onSubmit(): void {
    const { date } = this.myForm.value;
    if (date !== null || date == '') {
      this.eventService
        .join_activity(
          this.join_event.currentEventID,
          this.join_event.currentUserID,
          date
        )
        .subscribe({
          next: (test) => {
            console.warn(test);
            Swal.fire({
              icon: 'success',
              title: 'ลงทะเบียนสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.dialog.closeAll(); // Close the dialog
            });
          },
          error: (err) => {
            const dateText = date;
            const options = {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            };
            const formattedDate = dateText.toLocaleDateString('en-US', options);
            if (
              err.error.message == 'You already have another activity this day'
            ) {
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                html:
                  '<b>คุณได้ลงทะเบียนกิจกรรมวันที่ ' +
                  formattedDate +
                  ' ไว้แล้ว</b>',
                showCloseButton: true,
                confirmButtonText: 'ตรวจสอบกิจกรรม',
                confirmButtonColor: '#27a644',
                showCancelButton: true,
                cancelButtonText: 'ปิด',
                cancelButtonColor: '#ff2626',
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.close();
                  this.dialog.closeAll();
                  localStorage.setItem('TABS', JSON.stringify(1));
                  this.router.navigate(['/profile']);
                }
              });
            } else if (err.error.message == 'black list') {
              
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                html: 'ไม่สามารถลงทะเบียนได้เนื่องจากคุณติดสถานะแบล็คลิสต์',
                showCloseButton: true,
                confirmButtonText: 'ติดต่อฝ่ายประสานอาสาสมัคร',
                confirmButtonColor: '#27a644',
                showCancelButton: true,
                cancelButtonText: 'ปิด',
                cancelButtonColor: '#ff2626',
              });
            }
            console.warn(err.error.message);
          },
        });
    } else {
      // Handle the case when date is null
      console.warn('Date is null');
      // You can show an error message or perform other actions
    }
  }

  openDialog3() {
    this.dialog.open(SuccessJoinEventComponent);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
