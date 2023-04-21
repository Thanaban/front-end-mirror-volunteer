import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar-message',
  templateUrl: './snack-bar-message.component.html',
  styleUrls: ['./snack-bar-message.component.css']
})
export class SnackBarMessageComponent implements OnInit{

  message:any
  
  ngOnInit(): void {
    let data:any = localStorage.getItem('MESSAGE');
    this.message = JSON.parse(data);
  }
}
