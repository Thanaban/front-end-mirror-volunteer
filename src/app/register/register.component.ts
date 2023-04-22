import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

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
