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

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, passwordValidator(), Validators.minLength(6)],
        ],
        confirmPassword: ['', [Validators.required]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        nickname: ['', Validators.required],
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        religion: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        career: ['', Validators.required],
        workplace: ['', Validators.required],
        congenitalDisease: ['', Validators.required],
        allergicFood: ['', Validators.required],
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

      //   if (confirmPassword.value === '') {
      //     confirmPassword.setErrors({ required: true });
      // }
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }

      return null;
    };
  }

  ngOnInit(): void {}

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // passwordFormControl = new FormControl('', [
  //   Validators.required,
  //   passwordValidator(),
  //   Validators.minLength(8),
  // ]);

  // confirmPasswordFormControl = new FormControl('', [
  //   Validators.required,
  //   passwordValidator(),
  // ]);

  // matchingPasswords(x:string): void {

  // }

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
    } = this.form;

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
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }
}
