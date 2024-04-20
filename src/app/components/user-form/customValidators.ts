import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

export class CustomValidators extends Validators {
  constructor() {
    super();
  }

  static zipCode: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const zipCodePattern = /^\d{5}$/;
    return zipCodePattern.test(control.value) ? null : { zipCode: true };
  };

  static phoneNumber: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(control.value)
      ? null
      : { phoneNumber: true };
  };

  static passwordMatch =
    (passwordField: string, confirmPasswordField: string): ValidatorFn =>
    (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordField);
      const passwordConfirm = control.get(confirmPasswordField);

      if (!password || !passwordConfirm) {
        return null;
      }

      return password.value === passwordConfirm.value
        ? null
        : { passwordMatch: true };
    };

  static passwordEntropy$ =
    (passwordStrength$: BehaviorSubject<number>): AsyncValidatorFn =>
    (): Observable<ValidationErrors | null> => {
      return passwordStrength$.pipe(
        take(1),
        map((strength) => {
          const response = strength < 3 ? { passwordEntropy: true } : null;
          return response;
        })
      );
    };
}
