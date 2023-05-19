import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  MatDatepicker,
  MatDatepickerInput,
} from '@angular/material/datepicker';
import { Event_show } from './openevent-request-get';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { JoinEventComponent } from './join-event/join-event.component';
import { Observable } from 'rxjs';
import { SuccessJoinEventComponent } from './success-join-event/success-join-event.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { PleaseLoginComponent } from './please-login/please-login.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SlideInterface } from '../image-slider/slide.interface';
import { EventService } from '../_services/event.service';
import flatpickr from 'flatpickr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'app-openevent',
  templateUrl: './openevent.component.html',
  styleUrls: ['./openevent.component.css'],
})
export class OpeneventComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private status: AppComponent,
    private router: Router,
    private eventService: EventService
  ) {}
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  content?: string;
  slides: SlideInterface[] = [
    { url: '../../assets/image/2.jpg', title: '1' },
    { url: '../../assets/image/5.jpg', title: '1' },
    { url: '../../assets/image/14.jpg', title: '1' },
  ];

  panelOpenState = false;
  checklogin = this.status.isLoggedIn;
  currentUser: any;
  eventlist: Event_show[] = [];
  event_open: any;
  select_join_event: any;
  currentUserID: any;
  currentUserName: any;
  commentActivity: any;
  dateForm: any;
  month: any;

  ngOnInit(): void {
    this.getEvent();

    this.http.get('http://localhost:8000/users/user').subscribe((response) => {
      this.currentUser = response;
      console.warn('result', this.currentUser);
    });
  }

  getEvent() {
    this.http
      .get<Event_show[]>('http://localhost:8000/activities/open_activity')
      .subscribe((response) => {
        this.eventlist = response;
        console.warn(1);
        for (let i = 0; i < this.eventlist.length; i++) {
          this.fill_comment(this.eventlist[i].id, i);
        }
      });
  }

  fill_comment(x: number, index: number) {
    this.eventService.get_commnet_form_Ac(x).subscribe({
      next: (data) => {
        this.eventlist[index].comments = data;
        console.warn(this.eventlist[index].comments);
      },
    });
  }

  expand_comment(name: string, dateComment: string, textComment: string) {
    Swal.fire({
      title: name,
      html: textComment + '<br>แสดงความคิดเห็นเมื่อวันที่: ' + dateComment,
    });
  }

  con_date(d: any) {
    d = d.split('-');
    this.month = d[1];
    if (d[1] == '04') {
      d[1] = 'เม.ย';
    } else if (d[1] == '05') {
      d[1] = 'พ.ค';
    }
    d[0] = parseInt(d[0]) + 543;
    this.dateForm = d.reverse().join(' ');
    return this.dateForm;
  }

  openClothesDetail(
    clothesDetail: string,
    serviceDetail: string,
    rewardDetail: string,
    receivedHours: number
  ) {
    Swal.fire({
      title: 'ข้อมูลเพิ่มเติม',
      width: 1200,
      html:
        '<b><div style="display: flex; text-align: center;"><div style="width: 30%;border-width: 0px 2px 2px 0px;border-style: solid;border-color: #00000020;border-radius: 10px; margin: 2%;"><div style="margin: 5%;"><div style="font-size: 24px;margin: 2%;">การแต่งกาย</div><div style="text-align: left;">' +
        clothesDetail +
        '</div></div></div><div style="width: 30%;border-width: 0px 2px 2px 0px;border-style: solid;border-color: #00000020;border-radius: 10px; margin: 2%;"><div style="margin: 5%;"><div style="font-size: 24px;margin: 2%;">บริการจากมูลนิธิ</div><div style="text-align: left;">' +
        serviceDetail +
        '</div></div></div><div style="width: 30%;border-width: 0px 2px 2px 0px;border-style: solid;border-color: #00000020;border-radius: 10px; margin: 2%;"><div style="margin: 5%;"><div style="font-size: 24px;margin: 2%;">สิ่งที่อาสาจะได้รับ</div><div style="text-align: left;">' +
        rewardDetail +
        '<br>เวลาเข้าร่วมกิจกรรม ' +
        receivedHours +
        ' ชั่วโมง</div></div></div></div></b>',
      showCloseButton: true,
      confirmButtonText: 'ปิด',
      confirmButtonColor: '#ff2626',
    });
  }

  openTravelCarDetail(x: string) {
    Swal.fire({
      title: 'การเดินทางด้วยรถส่วนตัว',
      html: '<div style="text-align: left;"><b>' + x + '</b></div>',
      showCloseButton: true,
      confirmButtonText: 'ปิด',
      confirmButtonColor: '#ff2626',
    });
  }

  openTravelPulicDetail(x: string) {
    const formattedText = x.replace(/\n/g, '<br>');
    Swal.fire({
      title: 'การเดินทางด้วยรถส่วนตัว',
      html: '<div style="text-align: left;"><b>' + formattedText + '</b></div>',
      showCloseButton: true,
      confirmButtonText: 'ปิด',
      confirmButtonColor: '#ff2626',
    });
  }

  openServiceDetail(x: string) {
    const formattedText = x.replace(/\n/g, '<br>');
    Swal.fire({
      title: 'บริการจากมูลนิธิ',
      html: '<div style="text-align: left;"><b>' + formattedText + '</b></div>',
      showCloseButton: true,
      confirmButtonText: 'ปิด',
      confirmButtonColor: '#ff2626',
    });
  }

  openRewardDetail(x: string, y: number) {
    const formattedText = x.replace(/\n/g, '<br>');
    Swal.fire({
      title: 'สิ่งที่อาสาจะได้รับ',
      html:
        '<div style="text-align: left;"><b>' +
        formattedText +
        '<br> เวลาเข้าร่วมกิจกรรม ' +
        y +
        ' ชั่วโมง</b> </div>',
      showCloseButton: true,
      confirmButtonText: 'ปิด',
      confirmButtonColor: '#ff2626',
    });
  }

  openDialog() {
    this.dialog.open(ModalEventComponent);
  }

  openDialogPleaseLogin() {
    // this.dialog.open(PleaseLoginComponent);
    Swal.fire({
      icon: 'warning',
      title: '<strong>เกิดข้อผิดพลาด!</strong>',
      html: 'โปรดเข้าสู่ระบบก่อนสมัครเข้าร่วม',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-sign-in"></i> เข้าสู่ระบบ',
      confirmButtonColor: '#27a644',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

  openDialog2(
    currentEventID: number,
    currentEventName: string,
    currentUserID: number,
    currentUserName: string,
    endDate:Date
  ) {
    if (this.status.isLoggedIn) {
      console.warn('asdas', this.status.isLoggedIn);
      let data = {
        currentEventID,
        currentEventName,
        currentUserID,
        currentUserName,
        endDate
      };
      localStorage.setItem('EVENT', JSON.stringify(data));
      console.warn(
        'ID event:' + currentEventID,
        'ID user:' + this.currentUser.id
      );
      this.dialog.open(JoinEventComponent);
      this.http
        .get('http://localhost:8000/activities/getoneid/' + currentEventID)
        .subscribe((response) => {
          console.warn('result', response);
        });
    } else {
      console.warn('sssssssasdas', this.status.isLoggedIn);
    }
  }

  join_event(activityId: number, userId: number, date: Date): Observable<any> {
    return this.http.post(
      'http://localhost:8000/users/dateAc2',
      {
        activityId,
        userId,
        date,
      },
      httpOptions
    );
  }
}
