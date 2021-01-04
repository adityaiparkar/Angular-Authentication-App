import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { LoginModel } from '../models/user-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: LoginModel;
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.registerUserData = { Email: null, Password: null }
  }

  registerUser(f: NgForm) {
    if (f.invalid) {
      return;
    }


    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/special'])
        },
        err => console.log(err)
      )
  }



}
