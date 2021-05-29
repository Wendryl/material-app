import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserLoginDTO } from '../../models/user-login-dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    private auth: AuthService
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

  submitForm() {
    this.serverRequested = true;
    this.loading = true;

    if(this.form.invalid) {
      return;
    }

    this.user = this.form.value;
    this.auth.login(this.user)
      .then(
        data => {
          if(data.status == 200) {
            this.snackBar.open('Login success!', 'Nice!', this.snackConfig);
          } else {
            this.snackBar.open('Your e-mail or password is wrong!', 'Error!', this.snackConfig);
          }
          this.loading = false;
          this.serverRequested = false;
        }
      )
  }

}
