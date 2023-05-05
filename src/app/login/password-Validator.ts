import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&_-]{8,}$/;
    const passwordRegex = /^(?=.*\d)[a-zA-Z\d@$.!%*#?&_-]{8,}$/;
    const valid = passwordRegex.test(control.value);
    return valid ? null : {invalidPassword: {value: control.value}};
  };
}