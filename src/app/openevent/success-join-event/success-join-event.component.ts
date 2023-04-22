import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-join-event',
  templateUrl: './success-join-event.component.html',
  styleUrls: ['./success-join-event.component.css'],
})
export class SuccessJoinEventComponent implements OnInit {
  confirm_event: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let data: any = localStorage.getItem('EVENT');
    this.confirm_event = JSON.parse(data);
    console.log(this.confirm_event);
  }

  check_activity() {
    let data = { tabs: 1 };
    localStorage.setItem('TABS', JSON.stringify(data));
    this.router.navigate(['/profile']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
