import { Component,OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formEmail: any = {
    email: null,
  };

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    
  }

  onSubmit(): void{
    const { email } = this.formEmail;

    this.authService.emailResetPassWord(email).subscribe({
      next:data =>{
        console.log(data)
      }
    })

  }

}
