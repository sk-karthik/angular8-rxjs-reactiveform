import { AbstractControl } from '@angular/forms';
export function removeSpaces(control: AbstractControl) {
    const valueNoWhiteSpace = control.value.trim();
    const isValid = valueNoWhiteSpace === control.value;
    return isValid ? null : { whitespace: true };
}