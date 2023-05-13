import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { passwordValidator } from './password-Validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  formresetPassword: any = {
    email: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  durationInSeconds = 5;
  isDisabled: boolean = true;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      let message = { text: 'เข้าสู่ระบบสำเร็จ' };
      localStorage.setItem('MESSAGE', JSON.stringify(message));
      this._snackBar.openFromComponent(SnackBarMessageComponent, {
        duration: this.durationInSeconds * 1000,
      });
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        Swal.fire({
          icon: 'error',
          title: '<strong>เกิดข้อผิดพลาด!</strong>',
          html: 'โปรดอีเมลและรหัสผ่านให้ถูกต้อง',
          // showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-times"></i> ปิด',
          confirmButtonColor: '#27a644',
          confirmButtonAriaLabel: 'Thumbs up, great!',
        });
      },
    });
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    passwordValidator(),
    Validators.minLength(8),
  ]);
  hide = true;

  resetPassword() {
    Swal.fire({
      title: 'กรอกอีเมลที่ต้องการเปลี่ยนรหัสผ่าน',
      input: 'email',

      inputPlaceholder: 'กรอกอีเมล',
      inputValidator: (value) => {
        if (!value) {
          return 'โปรดกรอกอีเมล';
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'โปรดกรอกอีเมลให้ถูกต้อง';
        }
        return null;
      },
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#27a644',
      cancelButtonColor: '#d33',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonAriaLabel: 'Thumbs down',
      focusConfirm: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const { value: email } = result;
        this.authService.emailResetPassWord(email).subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: '<strong>อีเมลถูกต้อง</strong>',
              html: 'โปรดตรวจสอบคำขอที่อีเมลของท่าน',
              focusConfirm: false,
              confirmButtonText: '<i class="fa fa-times"></i> ปิด',
              confirmButtonColor: '#27a644',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: '<strong>เกิดข้อผิดพลาด</strong>',
              html: 'ไม่มีอีเมลนี้ในระบบ',
              focusConfirm: false,
              confirmButtonText: 'ลองอีกครั้ง',
              confirmButtonColor: '#27a644',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              showCancelButton: true,
              cancelButtonText: 'ยกเลิก',
              cancelButtonColor: '#d33',
            }).then((result) => {
              if (result.isConfirmed) {
                this.resetPassword();
              }
            });
          },
        });
      }
    });
  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
