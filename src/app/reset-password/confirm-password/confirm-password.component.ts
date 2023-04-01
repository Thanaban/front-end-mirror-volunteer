import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
  export class ConfirmPasswordComponent implements OnInit{
    
    currentToken:any

    formPassword: any = {
      email: null,
      password: null
    };

    constructor(private authService: AuthService,private route:ActivatedRoute,private http: HttpClient){}

    ngOnInit(): void {

      this.route.queryParams.subscribe(params => {
        const token = params['token'];
        this.currentToken = token
        console.log(token,'http://localhost:8000/users/reset-password?token='+this.currentToken); // Do whatever you want with the token value
      })
      
    }

    onSubmit(): void{
      const { password } = this.formPassword;
      console.warn(this.currentToken)
      console.warn(password)
      this.http.post(`http://localhost:8000/users/reset-password?token=${this.currentToken}`,{password}).subscribe({
        next:data =>{
          console.log(data)
        }
      })
      
      
      }
      // this.authService.confirmResetPassWord(password).subscribe({
      //   next:data =>{
      
      //   }
      // })
  
    
}
