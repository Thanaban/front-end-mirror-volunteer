import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { passwordValidator } from '../login/password-Validator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
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
    know_from: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  myForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router) {
    this.myForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, passwordValidator(), Validators.minLength(6)],
        ],
        confirmPassword: ['', Validators.required],
        name: ['', Validators.required, Validators.minLength(1)],
        lastname: ['', Validators.required, Validators.minLength(1)],
        nickname: ['', Validators.required],
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        religion: [],
        phoneNumber: [
          '',
          Validators.required,
          Validators.pattern(/^0\d{8,9}$/),
        ],
        career: [],
        workplace: [],
        congenitalDisease: [],
        allergicFood: [],
        talent: [],
        know_from: ['', Validators.required],
      },
      { validator: this.matchingPasswords('password', 'confirmPassword') }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): ValidationErrors | null => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }

      return null;
    };
  }

  ngOnInit(): void {
    this.form.confirmPassword = null;
  }



  onSubmit(): void {
    const {
      email,
      password,
      name,
      lastname,
      nickname,
      birthday,
      gender,
      religion,
      phoneNumber,
      career,
      workplace,
      congenitalDisease,
      allergicFood,
      talent,
      know_from,
      confirmPassword
    } = this.myForm.value;

    this.authService
      .register(
        email,
        password,
        name,
        lastname,
        nickname,
        birthday,
        gender,
        religion,
        phoneNumber,
        career,
        workplace,
        congenitalDisease,
        allergicFood,
        talent,
        know_from
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          Swal.fire({
            icon: 'success',
            title: '<strong>ลงทะเบียนสำเร็จ!</strong>',
            html: 'สามารถเข้าสู่ระบบด้วยบัญชีที่ลงทะเบียนได้',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'รับทราบ',
            confirmButtonColor: '#27a644',
            confirmButtonAriaLabel: 'Thumbs up, great!',
          });
          this.router.navigate(['/login']);
          
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          
          if (this.errorMessage=='This e-mail is already used'){
            this.errorMessage = 'อีเมล: ' +this.myForm.value.email+ ' ถูกใช้ไปแล้ว'
            Swal.fire({
              icon: 'error',
              title: '<strong>เกิดข้อผิดพลาด!</strong>',
              html: this.errorMessage,
              // showCloseButton: true,
              focusConfirm: false,
              confirmButtonText: '<i class="fa fa-times"></i> ปิด',
              confirmButtonColor: '#27a644',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: '<strong>เกิดข้อผิดพลาด!</strong>',
              html: 'โปรดกรอกข้อมูลที่บังคับ',
              // showCloseButton: true,
              focusConfirm: false,
              confirmButtonText: '<i class="fa fa-times"></i> ปิด',
              confirmButtonColor: '#27a644',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            });
          }
        },
      });
    // Check if the form is valid
  // if (this.myForm.valid) {
  //   const {
  //     email,
  //     password,
  //     name,
  //     lastname,
  //     nickname,
  //     birthday,
  //     gender,
  //     religion,
  //     phoneNumber,
  //     career,
  //     workplace,
  //     congenitalDisease,
  //     allergicFood,
  //     talent,
  //     know_from,
  //   } = this.myForm.value;

  //   // Submit the form data
  //   this.authService.register(
  //     email,
  //     password,
  //     name,
  //     lastname,
  //     nickname,
  //     birthday,
  //     gender,
  //     religion,
  //     phoneNumber,
  //     career,
  //     workplace,
  //     congenitalDisease,
  //     allergicFood,
  //     talent,
  //     know_from
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //       Swal.fire({
  //         icon: 'warning',
  //         title: '<strong>สำเร็จ!</strong>',
  //         html: 'โปรดเข้าสู่ระบบก่อนสมัครเข้าร่วม',
  //         showCloseButton: true,
  //         focusConfirm: false,
  //         confirmButtonText: '<i class="fa fa-sign-in"></i> เข้าสู่ระบบ',
  //         confirmButtonColor: '#27a644',
  //         confirmButtonAriaLabel: 'Thumbs up, great!',
        
  //       });
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error.message;
  //       this.isSignUpFailed = true;
  //     },
  //   });
  // } else {
  //   // Set all form controls to touched to trigger validation messages
    // Swal.fire({
    //   icon: 'warning',
    //   title: '<strong>เกิดข้อผิดพลาด!</strong>',
    //   html: 'โปรดกรอกข้อมูลที่บังคับ',
    //   showCloseButton: true,
    //   focusConfirm: false,
    //   confirmButtonText: '<i class="fa fa-sign-in"></i> เข้าสู่ระบบ',
    //   confirmButtonColor: '#27a644',
    //   confirmButtonAriaLabel: 'Thumbs up, great!',
    
    // });
  //   this.myForm.markAllAsTouched();
    
  }

  
}
