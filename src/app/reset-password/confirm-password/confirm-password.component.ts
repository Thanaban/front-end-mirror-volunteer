import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  ValidationErrors,
} from '@angular/forms';
import { passwordValidator } from 'src/app/login/password-Validator';
import Swal from 'sweetalert2';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss'],
})
export class ConfirmPasswordComponent implements OnInit {
  currentToken: any;
  myForm: FormGroup;
  errorMessage = '';

  form: any = {
    password: null,
  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group(
      {
        password: [
          '',
          [Validators.required, passwordValidator(), Validators.minLength(6)]
        ],
        confirmPassword: ['', Validators.required],
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
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      this.currentToken = token;
      console.log(
        token,
        'http://localhost:8000/users/reset-password?token=' + this.currentToken
      ); // Do whatever you want with the token value
    });
  }

  onSubmit(): void {
    const { password } = this.myForm.value;
    console.warn(this.currentToken);
    console.warn(password);
    this.http
      .post(
        `http://localhost:8000/users/reset-password?token=${this.currentToken}`,
        { password }
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire({
            icon: 'error',
            title: '<strong>เกิดข้อผิดพลาด!</strong>',
            html: this.errorMessage,

            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-times"></i> ปิด',
            confirmButtonColor: '#27a644',
            confirmButtonAriaLabel: 'Thumbs up, great!',
          });
        },
        error: (err) =>{
          this.errorMessage = err.error.message;
          Swal.fire({
            icon: 'error',
            title: '<strong>เกิดข้อผิดพลาด!</strong>',
            html: this.errorMessage,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-times"></i> ปิด',
            confirmButtonColor: '#27a644',
            confirmButtonAriaLabel: 'Thumbs up, great!',
          });
        }
      });
  }

  passwordFormControl = new FormControl('', [
    Validators.required,
    passwordValidator(),
    Validators.minLength(8),
  ]);
  // this.authService.confirmResetPassWord(password).subscribe({
  //   next:data =>{

  //   }
  // })
}
