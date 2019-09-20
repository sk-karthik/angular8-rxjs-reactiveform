import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { removeSpaces } from '../../common/customvalidator/removeSpaces'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.loggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), removeSpaces]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;
    // console.log(JSON.stringify(this.loginForm.value));
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['dashboard']);
        },
        error => {
          // this.alertService.error(error)
          this.error = error.error.message;
          this.loading = false;
          setTimeout(() => { this.error = ''; }, 5000)
        });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    // console.log(this.loginForm.controls[control]);
    return this.loginForm.controls[control].hasError(error);
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
