import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event_show } from '../../openevent/openevent-request-get';
import { EventService } from 'src/app/_services/event.service';
import { EditEventDetailComponent } from './edit-event-detail/edit-event-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-manage-event',
  templateUrl: './admin-manage-event.component.html',
  styleUrls: ['./admin-manage-event.component.css'],
})
export class AdminManageEventComponent implements OnInit {
  panelOpenState = false;
  eventlist: Event_show[] = [];
  status: any;

  isChecked: any;
  form: any = {
    status_event: null,
  };

  constructor(
    private http: HttpClient,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http
      .get<Event_show[]>('https://api.volunteerm.online/users/activities')
      .subscribe((response) => {
        this.eventlist = response;
        console.warn('result', response);
      });
  }

  event_status(x: boolean) {
    if (x == true) {
      this.status = 'เปิดรับสมัคร';
    } else {
      this.status = 'ปิดรับสมัคร';
    }
  }

  update_event_status(currentEventId: number, currentEventStatus: boolean) {
    this.eventService
      .status_activity(currentEventId, currentEventStatus)
      .subscribe({
        next: (test) => {},
      });
  }

  openDialogEditDetail(currentActivityId: number) {
    this.dialog.open(EditEventDetailComponent);

    let data = { currentActivityId };
    localStorage.setItem('EVENT', JSON.stringify(data));
  }

  openDialogaAddEvent() {
    this.dialog.open(AddEventComponent);
  }

  async AddEvent() {
    const { value: formValues } = await Swal.fire({
      title: 'Add Event',
      html:
        `<input id="activity_name" class="swal2-input large-input" placeholder="Activity Name" value="อาสาจัดเต็ม">` +
        `<input id="activity_details" class="swal2-input large-input" placeholder="Activity Details" value="ช่วยงานทุกอย่าาง">` +
        `<input id="size_number" class="swal2-input large-input" placeholder="Size Number" value="40">` +
        `<input id="received_hours" class="swal2-input large-input" placeholder="Received Hours" value="8">` +
        `<input id="map" class="swal2-input large-input" placeholder="Map" value="map">` +
        `<input id="start_date" class="swal2-input large-input" placeholder="Start Date" value="2023-02-20">` +
        `<input id="is_open" class="swal2-input large-input" placeholder="Is Open" value="true">` +
        `<input id="picture" class="swal2-input large-input" placeholder="Picture URL" value="http://drive.google.com/uc?export=view&id=1zbK2OJZ8Hy1lOoTPXjOX1VDvGIKEKpwu">` +
        `<input id="priority" class="swal2-input large-input" placeholder="Priority" value="1">` +
        `<input id="time_detail" class="swal2-input large-input" placeholder="Time Detail" value="9.00 - 16.00">` +
        `<input id="clothes_detail" class="swal2-input large-input" placeholder="Clothes Detail" value="กางเกงขายาว รองเท้าผ้าใบสามารถใส่ชุดนักเรียน ชุดพละ ชุดนักศึกษาได้">` +
        `<input id="etc_detail" class="swal2-input large-input" placeholder="Etc Detail" value="บริการอาหารกลางวันให้ฟรี  1 มื้อ และตอนเลิก กิจกรรมจะมีเจ้าหน้าที่ไปส่งที่ BTS สีเขียวสถานนีวัดพระศรีมหาธาตุ และ BTS สายสีแดง สถานนี หลักสี่">` +
        `<input id="travel_detail" class="swal2-input large-input" placeholder="Travel Detail" value="ให้ปักหมุดมายัง Mirror Art เลขที่ 143/19 ถนนแจ้งวัฒนะซอยแจ้งวัฒนะ1แยก6 แขวงตลาดบางเขน เขตหลักสี่ กรุงเทพมหานคร 10210">` +
        `<input id="travel_public_detail" class="swal2-input large-input" placeholder="Travel Public Detail" value="1.โดยสารรถไฟฟ้า BTS ลงสถานนีปลายทางวัดพระศรีมหาธาตุหรือสารรถไฟฟ้าใต้ดิน MRT ลงสถานีปลายทางจตุจักร สามารถขึ้น BTSลงสถานนีปลายทางวัดพระศรีมหาธาตุ 2.ต่อรถเมล์สาย -สาย 510(ไม่ขึ้นทางด่วน)โดยขึ้นฝั่งเดียวกันกับสวนจตุจักรลงป้ายหน้าโรงแรมมิราเคิล(กรณีมาจากฝั่งรังสิตให้ลงป้ายรถเมล์ โรงเรียนผไทอุดมศึกษา )-สาย 51 โดยขึ้นฝั่ง ม.เกษตรศาสตร์ลงป้ายตรงข้ามโรงเรียนเจริญผล-สาย 95ก โดยขึ้นจากท่ารถแฮปปี้แลนด์ลงป้ายตรงข้ามโรงเรียนเจริญผล -สาย ปอ.150 โดยขึ้นจากท่ารถแฮปปี้แลนด์ลงป้ายตรงข้ามโรงเรียนเจริญผล 3.ข้ามสะพานลอย เดินมาปากซอยวิภาวดี64 ต่อวินมอเตอร์ไซต์แจ้งว่าจะไปมูลนิธิกระจกเงาซอยแจ้งวัฒนะ1 แยก6">` +
        `<input id="travel_etc_detail" class="swal2-input large-input" placeholder="Travel Etc Detail" value="เกียรติบัตรจากมูลนิธิ">` +
        `<input id="timeline" class="swal2-input large-input" placeholder="Timeline" value="string">`,
      focusConfirm: false,
      customClass: {
        container: 'swal2-container-custom',
        input: 'swal2-input',
        confirmButton: 'swal2-confirm-button',
        cancelButton: 'swal2-cancel-button',
      },
      preConfirm: () => {
        const activityNameInput = document.getElementById(
          'activity_name'
        ) as HTMLInputElement;
        const activityDetailsInput = document.getElementById(
          'activity_details'
        ) as HTMLInputElement;
        const sizeNumberInput = document.getElementById(
          'size_number'
        ) as HTMLInputElement;
        const receivedHoursInput = document.getElementById(
          'received_hours'
        ) as HTMLInputElement;
        const mapInput = document.getElementById('map') as HTMLInputElement;
        const startDateInput = document.getElementById(
          'start_date'
        ) as HTMLInputElement;
        const isOpenInput = document.getElementById(
          'is_open'
        ) as HTMLInputElement;
        const pictureInput = document.getElementById(
          'picture'
        ) as HTMLInputElement;
        const priorityInput = document.getElementById(
          'priority'
        ) as HTMLInputElement;
        const timeDetailInput = document.getElementById(
          'time_detail'
        ) as HTMLInputElement;
        const clothesDetailInput = document.getElementById(
          'clothes_detail'
        ) as HTMLInputElement;
        const etcDetailInput = document.getElementById(
          'etc_detail'
        ) as HTMLInputElement;
        const travelDetailInput = document.getElementById(
          'travel_detail'
        ) as HTMLInputElement;
        const travelPublicDetailInput = document.getElementById(
          'travel_public_detail'
        ) as HTMLInputElement;
        const travelEtcDetailInput = document.getElementById(
          'travel_etc_detail'
        ) as HTMLInputElement;
        const timelineInput = document.getElementById(
          'timeline'
        ) as HTMLInputElement;
  
        if (
          activityNameInput &&
          activityDetailsInput &&
          sizeNumberInput &&
          receivedHoursInput &&
          mapInput &&
          startDateInput &&
          isOpenInput &&
          pictureInput &&
          priorityInput &&
          timeDetailInput &&
          clothesDetailInput &&
          etcDetailInput &&
          travelDetailInput &&
          travelPublicDetailInput &&
          travelEtcDetailInput &&
          timelineInput
        ) {
          this.eventService.create_activity(
            activityNameInput.value,
            activityDetailsInput.value,
            Number(sizeNumberInput.value),
            Number(receivedHoursInput.value),
            mapInput.value,
            new Date(startDateInput.value),
            isOpenInput.value === 'true',
            pictureInput.value,
            Number(priorityInput.value),
            timeDetailInput.value,
            clothesDetailInput.value,
            etcDetailInput.value,
            travelDetailInput.value,
            travelPublicDetailInput.value,
            travelEtcDetailInput.value,
            timelineInput.value
          ).subscribe(
            (response) => {
              // Handle the response as needed
              console.log(response);
            },
            (error) => {
              // Handle the error as needed
              console.error(error);
            }
          );
          return {
            activity_name: activityNameInput.value,
            activity_details: activityDetailsInput.value,
            size_number: sizeNumberInput.value,
            received_hours: receivedHoursInput.value,
            map: mapInput.value,
            start_date: startDateInput.value,
            is_open: isOpenInput.value === 'true',
            picture: pictureInput.value,
            priority: priorityInput.value,
            time_detail: timeDetailInput.value,
            clothes_detail: clothesDetailInput.value,
            etc_detail: etcDetailInput.value,
            travel_detail: travelDetailInput.value,
            travel_public_detail: travelPublicDetailInput.value,
            travel_etc_detail: travelEtcDetailInput.value,
            timeline: timelineInput.value,
          };
        }
        return null;
      },
    });
  
    if (formValues) {
      Swal.fire({
        title: 'เพิ่มกิจกรรมสำเร็จ',
        icon: 'success',
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
