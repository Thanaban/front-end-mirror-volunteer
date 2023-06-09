import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event_show } from './openevent-request-get';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { JoinEventComponent } from './join-event/join-event.component';
import { AppComponent } from '../app.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SlideInterface } from '../image-slider/slide.interface';
import { EventService } from '../_services/event.service';
import { response } from 'express';
import { StorageService } from '../_services/storage.service';

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
    private storageService: StorageService,
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

  MaxratingValue: number[] = [1, 2, 3, 4, 5];
  ratingValue: number = 0;

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
    // this.http.get('https://api.volunteerm.online/users/user').subscribe((response) => {
    //   this.currentUser = response;
    // });
    this.currentUser = this.storageService.getUser();
  }

  getEvent() {
    this.eventService.get_open_activity().subscribe((response) =>{
      this.eventlist = response;
    })
    // this.http
    //   .get<Event_show[]>('https://api.volunteerm.online/activities/open_activity')
    //   .subscribe((response) => {
    //     this.eventlist = response;
    //   });
  }

  encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }

  fill_comment(x: number, index: number) {
    // this.eventService.get_commnet_form_Ac(x).subscribe({
    //   next: (data) => {
    //     this.eventlist[index].comments = data;
    //   },
    // });
  }

  con_date(d: any) {
  if (d) {
    const dateParts = d.split('-');
    this.month = dateParts[1];
  
    if (dateParts[1] === '04') {
      dateParts[1] = 'เม.ย';
    } else if (dateParts[1] === '05') {
      dateParts[1] = 'พ.ค';
    } else if (dateParts[1] === '06') {
      dateParts[1] = 'มิ.ย';
    } else if (dateParts[1] === '07') {
      dateParts[1] = 'ก.ค';
    } else if (dateParts[1] === '08') {
      dateParts[1] = 'ส.ค';
    } else if (dateParts[1] === '09') {
      dateParts[1] = 'ก.ย';
    } else if (dateParts[1] === '10') {
      dateParts[1] = 'ต.ค';
    } else if (dateParts[1] === '11') {
      dateParts[1] = 'พ.ย';
    } else if (dateParts[1] === '12') {
      dateParts[1] = 'ธ.ค';
    } 
  
    dateParts[0] = parseInt(dateParts[0]) + 543;
    this.dateForm = dateParts.reverse().join(' ');
    return this.dateForm;
  }
  
  return '';
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
      title: 'เดินทางด้วยรถสาธารณะ',
      html: '<div style="text-align: left;"><b>' + formattedText + '</b></div>',
      showCloseButton: true,
      confirmButtonText: 'ปิด',
      confirmButtonColor: '#ff2626',
    });
  }

  openDialog() {
    this.dialog.open(ModalEventComponent);
  }

  openDialogPleaseLogin() {
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

  openJoinEventDialog(
    currentEventID: number,
    currentEventName: string,
    currentUserID: number,
    currentStatus: boolean,
    endDate: Date
  ) {
    if (currentStatus == false) {
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
    } else {
      let data = {
        currentEventID,
        currentEventName,
        currentUserID,
        currentStatus,
        endDate,
      };
      localStorage.setItem('EVENT', JSON.stringify(data));
      this.dialog.open(JoinEventComponent);
    }
  }
}
