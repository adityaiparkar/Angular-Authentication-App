import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { LoginModel } from '../models/user-model';
import { NgForm, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginUserData: LoginModel;

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
    this.loginUserData = { Email: null, Password: null }
  }

  loginUser(f: NgForm) {
    if (f.invalid) {
      return;
    }

    let payload = new LoginModel();
    payload.Email = this.loginUserData.Email;
    payload.Password = this.loginUserData.Password;

    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/special'])
        },
        err => console.log(err)
      )
  }
}
