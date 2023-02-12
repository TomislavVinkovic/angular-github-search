import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function requireOneCheckboxValidator(minRequired = 1): ValidatorFn {
  return function validate (formGroup: AbstractControl) {
    let checked = 0;

    Object.keys((formGroup as FormGroup).controls).forEach(key => {
      const control = (formGroup as FormGroup).controls[key];

      if (control.value === true) {
        checked ++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxesToBeChecked: true,
      };
    }

    return null;
  };
}