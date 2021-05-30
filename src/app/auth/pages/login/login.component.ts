import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLoginDTO } from '../../models/user-login-dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../common.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  serverRequested = false;

  snackConfig: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private snackBar: MatSnackBar,
    private user: UserLoginDTO,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getEmailError(): string | void {

    if(!this.form.controls.email.value) {
      return 'E-mail must not be empty!';
    }

    if(this.form.controls.email.invalid) {
      return 'This e-mail isn\'t valid!';
    }

    return;
  }

  getPasswordError(): string | void {
    if(!this.form.controls.email.value) {
      return 'Password must not be empty!';
    }
    return;
  }

  intiateRequest(): void {
    this.serverRequested = true;
    this.loading = true;
  }

  clearRequest(): void {
    this.serverRequested = false;
    this.loading = false;
  }

  submitForm(): void {
    this.intiateRequest();

    if(this.form.invalid) {
      this.clearRequest();
      this.snackBar.open('Please fill in all fields correctly!', 'Error!', this.snackConfig);
      return;
    }

    this.user = this.form.value;
    this.auth.login(this.user)
      .then(
        data => {
          if(data.status == 200) {
            this.snackBar.open('Login success!', 'Nice!', this.snackConfig);
          } else {
            this.snackBar.open('Incorrect e-mail or password!', 'Error!', this.snackConfig);
          }
          this.clearRequest();
        }
      )
  }

  register(): void {
    this.router.navigate(['/register']);
  }

}
