import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-blacklist-snack-bar',
  templateUrl: './blacklist-snack-bar.component.html',
  styleUrls: ['./blacklist-snack-bar.component.css']
})
export class BlacklistSnackBarComponent implements OnInit {

  blacklistData:any
  status:any
  _blacklist=false;
  _nonblacklist:boolean = false;


  ngOnInit(): void {
    let data:any = localStorage.getItem('MANAGEUSER');
    this.blacklistData = JSON.parse(data);
    console.log(this.blacklistData.userStatus)
    
  }

  // change_status(x:boolean){
  //   if (x == true) {
  //     this.status = "ปลดแบล็คลิสต์"
      
  //   } else {
  //     this.status = "ให้แบล็คลิสต์"
      
  //   }
  // }
}
