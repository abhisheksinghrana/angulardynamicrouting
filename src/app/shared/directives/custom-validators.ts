import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static noWhiteSpace(control: AbstractControl): any {
    if (!control.value) {
      return null;
    }
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
