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
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'th-TH' }],
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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
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
    for (const key in this.myForm.value) {
      if (
        this.myForm.value.hasOwnProperty(key) &&
        this.myForm.value[key] === null
      ) {
        Swal.fire({
          icon: 'error',
          title: '<strong>เกิดข้อผิดพลาด!</strong>',
          html: `โปรดกรอกข้อมูลที่บังคับให้ครบถ้วน`,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-times"></i> ปิด',
          confirmButtonColor: '#27a644',
          confirmButtonAriaLabel: 'Thumbs up, great!',
        });
        return;
      }
    }

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

          if (this.errorMessage == 'This e-mail is already used') {
            this.errorMessage =
              'อีเมล: ' + this.myForm.value.email + ' ถูกใช้ไปแล้ว';
            Swal.fire({
              icon: 'error',
              title: '<strong>เกิดข้อผิดพลาด!</strong>',
              html: this.errorMessage,

              focusConfirm: false,
              confirmButtonText: '<i class="fa fa-times"></i> ปิด',
              confirmButtonColor: '#27a644',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '<strong>เกิดข้อผิดพลาด!</strong>',
              html: 'โปรดกรอกข้อมูลให้ถูกต้อง',

              focusConfirm: false,
              confirmButtonText: '<i class="fa fa-times"></i> ปิด',
              confirmButtonColor: '#27a644',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            });
          }
        },
      });
  }
}
