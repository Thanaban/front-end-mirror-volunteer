import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const nameRegex: RegExp = /^[ก-๏a-zA-Z\s]+$/;
const phoneRegex: RegExp = /^[0]{1}[6,8,9]{1}[0-9]{8}/;



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],

})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
    confirmPassword:null,
    name: null,
    lastname: null,
    nickname: null,
    birthday: null,
    gender: null,
    religion: null,
    phoneNumber: null,
    career: null,
    workplace: null,
    congenitalDisease: null,
    allergicFood: null,
    talent: null,
    know_from: null
  };
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password,confirmPassword, name, lastname, nickname, birthday, gender, religion, phoneNumber, career, workplace, congenitalDisease, allergicFood, talent, know_from} = this.form;
    if (emailRegex.test(email) == false) {
      alert('กรุณาใส่รูปแบบอีเมลล์ให้ถูกต้อง')
    } else if (passwordRegex.test(password) == false) {
      alert('พาสเวิดต้องประกอบด้วะ')
    } else if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกันจย้่ส')
    } else if (nameRegex.test(name) == false ) {
      alert('ใส่ชื่อไม่ถุกจ้า')
    } else if (nameRegex.test(lastname) == false) {
      alert('นามสกุลก็ไม่ได้เป่า')
    } else if (nameRegex.test(nickname) == false ) {
      alert('ชื่อเล่นกะผิด')
    } else if (phoneRegex.test(phoneNumber) == false) {
      alert('เบอร์ผิด')
    }
   

    else {
      this.authService.register( email, password ,name,lastname,nickname, birthday, gender, religion, phoneNumber, career, workplace, congenitalDisease, allergicFood, talent, know_from).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        alert('มีอีเมลล์นี้ในระบบแร้วน้า')
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    }
    
  }
}
