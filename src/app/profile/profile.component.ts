import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';
import { User_show } from './profile-request-get';
import { EventService } from '../_services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { CancelEventConfirmComponent } from './cancel-event-confirm/cancel-event-confirm.component';
import Swal from 'sweetalert2';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { userActivity_show } from './user-activity-request-get';
import { result } from 'cypress/types/lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Router } from '@angular/router';
import { CertificateComponent } from './certificate/certificate.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ;
  tabs: number = 0;

  public C1: User_show[] = [];
  currentUser: any;
  check_activity: userActivity_show[] = [];
  pagedDataArray: any[] = [];
  currentPage: number = 0;
  pageSize: number = 3;
  totalItems: number = 0;
  history_activity: userActivity_show[] = [];
  show_check_activity: any;
  date_con: any;
  status: any;
  currentActivity: any;
  isLoggedIn = false;
  isBlacklist = true;
  dataActivity: any;
  currentPageIndex = 0;
  dateForm: any;
  month: any;
  certi = false;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private eventService: EventService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  private httpOptions: any;

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.currentUser = this.storageService.getUser();
    let data: any = localStorage.getItem('TABS');
    this.tabs = data;
    localStorage.removeItem('TABS');
    // this.http
    //   .get('https://backend-volunteer.onrender.com/users/user', this.httpOptions)
    //   .subscribe((response) => {
    //     this.currentUser = response;
    //   if (this.currentUser.non_blacklist == true) {
    //     this.status = 'ปกติ';
    //   } else {
    //     this.status = 'แบล็คลิสต์';
    //     this.isBlacklist = false;
    //   }
    // });

    this.http
      .get<any[]>('https://api.volunteerm.online/users/get-ended-useractivity')
      .subscribe((response4) => {
        this.history_activity = response4;
      });

    const initialPageEvent = { pageIndex: 0, pageSize: 3 } as PageEvent;
  }

  cer(currentUser:string,currentActivityName:string){
    let data = {
      currentUser,
      currentActivityName
    };
    localStorage.setItem('CERTI', JSON.stringify(data));
    this.router.navigate(['/certificate']);
  }

  calculateAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  getDataUserActivity(): void {
    this.http
      .get<userActivity_show[]>(
        'https://api.volunteerm.online/users/get-useractivity'
      )
      .subscribe((response) => {
        this.check_activity = response;
        this.totalItems = this.check_activity.length;
        for (let i = 0; i < this.check_activity.length; i++) {
          this.getDateActivity(
            this.check_activity[i].activityId,
            i,
            this.check_activity
          );
        }
        const pageEvent: PageEvent = {
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          length: this.totalItems,
        };

        this.handlePageChange(pageEvent, this.check_activity);
      });
  }

  getDataUserActivityEnd(): void {
    this.http
      .get<userActivity_show[]>(
        'https://api.volunteerm.online/users/get-ended-useractivity'
      )
      .subscribe((response) => {
        this.history_activity = response;
        this.totalItems = this.history_activity.length;
        for (let i = 0; i < this.history_activity.length; i++) {
          this.getDateActivity(
            this.history_activity[i].activityId,
            i,
            this.history_activity
          );
        }
        const pageEvent: PageEvent = {
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          length: this.totalItems,
        };

        this.handlePageChange(pageEvent, this.history_activity);
      });
  }

  getDateActivity(id: any, index: number, dataSource: any[]) {
    this.eventService.get_one_activity(id).subscribe({
      next: (data) => {
        dataSource[index].getEvent = data;
      },
    });
  }

  handlePageChange(event: PageEvent, dataSource: any[]): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDataArray = dataSource.slice(startIndex, endIndex);
  }

  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 1) {
      this.getDataUserActivity();
    } else if (event.index === 2) {
      this.getDataUserActivityEnd();
    }
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

  blackListLabel(x: boolean) {
    if (x == false) {
      this.isBlacklist = false;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    const day = this.addLeadingZero(date.getDate());
    const month = this.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const formattedDate = this.con_date(`${year}-${month}-${day}`);

    this.con_date(formattedDate);
    return `${formattedDate} เวลา:${hours}:${minutes}.น`;
  }

  addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
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
    }
    d[0] = parseInt(d[0]) + 543;
    this.dateForm = d.reverse().join(' ');
    return this.dateForm;
  }

  openDialogCancel(
    currentActivityId: number,
    currentUserID: number,
    cancelDate: Date
  ) {
    Swal.fire({
      title: 'โปรดยืนยัน?',
      html: '<b>คุณต้องการยกเลิกกิจกรรมนี้</b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#27a644',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ปิด',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService
          .cancel_activity(currentActivityId, currentUserID, cancelDate)
          .subscribe({
            next: (data) => {
              Swal.fire({
                icon: 'success',
                title: 'ยกเลิกกิจกรรมสำเร็จ',
                showConfirmButton: false,
                timer: 1500,
              });

              this.refreshTabData(this.check_activity); // Refresh the tab data
              this.getDataUserActivity();
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: '<strong>เกิดข้อผิดพลาด</strong>',
                html: 'ไม่มีสามารถยกเลิกก่อนวันเริ่มกิจกรรมได้',
                showCloseButton: true,
                confirmButtonText: 'ปิด',
                confirmButtonColor: '#ff2626',
              });
            },
          });
      }
    });
  }

  refreshTabData(data: any[]): void {
    this.http
      .get<any[]>('https://api.volunteerm.online/users/get-useractivity')
      .subscribe((response) => {
        data = response;
        this.totalItems = data.length;

        const pageEvent: PageEvent = {
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          length: this.totalItems,
        };

        this.handlePageChange(pageEvent, data);
      });
  }

  openDialogDetail(
    currentActivityId: number,
    currentActivityName: string,
    currentUserID: number,
    currentUserName: string,
    cancelDate: Date
  ) {
    this.dialog.open(DetailActivityComponent);

    let data = {
      currentActivityId,
      currentActivityName,
      currentUserID,
      currentUserName,
      cancelDate,
    };
    localStorage.setItem('EVENT', JSON.stringify(data));
  }

  openDialogComment(
    currentUserActivityId: number,
    currentActivityId: number,
    currentActivityName: string,
    currentUserID: number,
    currentUserName: string
  ) {
    // this.dialog.open(PostCommentComponent);

    Swal.fire({
      title: 'แสดงความคิดเห็น',
      input: 'textarea',

      inputPlaceholder: 'เขียนความคิดเห็นของท่าน',
      inputValidator: (value) => {
        if (!value) {
          return 'โปรดกรอกความคิดเห็น';
        }
        return null;
      },
      showCancelButton: true,
      confirmButtonText: 'โพสต์',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#27a644',
      cancelButtonColor: '#d33',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonAriaLabel: 'Thumbs down',
      focusConfirm: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const { value: comment } = result;
        this.eventService
          .post_comment(
            currentUserID,
            currentUserActivityId,
            currentActivityId,
            comment
          )
          .subscribe({
            next: (data) => {
              Swal.fire({
                icon: 'success',
                title: 'โพสต์คความคิดเห็นสำเร็จ',
                showConfirmButton: false,
                timer: 1500,
              });
            },
          });
      }
    });

    let data = {
      currentUserActivityId,
      currentActivityId,
      currentActivityName,
      currentUserID,
      currentUserName,
    };
    localStorage.setItem('EVENT', JSON.stringify(data));
  }

  

  reloadPage(): void {
    window.location.reload();
  }
}
