import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function intercertEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) return null;

    const validDomain = '@intercert.com';
    const isValid = email.endsWith(validDomain);

    return isValid ? null : { intercertEmail: true };
  };
}
