import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit{

  comment_event: any

  form: any = {
    comment: null
  };

  constructor(private eventService:EventService){}

  ngOnInit(): void {

    let data:any = localStorage.getItem('EVENT');
    this.comment_event = JSON.parse(data);
    console.log(
      "activityId"+this.comment_event.currentActivityId,
      this.comment_event.currentActivityName,
      "userId"+this.comment_event.currentUserID,
      this.comment_event.currentUserName,
      
      )

  }


  onSubmit(): void {
    const { comment } = this.form;

    this.eventService.post_comment(this.comment_event.currentUserID,this.comment_event.currentActivityId,comment).subscribe({
      next:test => {
        console.log(test,comment)
      }
    })
  }
  
}
