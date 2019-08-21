import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const ConfirmPasswordValidator : ValidatorFn = (control: FormGroup) : ValidationErrors | null => {
    let password = control.get('Password');
    let confirmPassword = control.get('ConfirmPassword');

    return  password.value === confirmPassword.value ? null : {"doesntMatch" : true};
}