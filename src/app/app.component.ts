import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'
  authResult: boolean
  isLoggedIn = true

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {

  }

  logout() {
    this._authService.logoutUser()
  }

  checkSession() {
    let data = localStorage.getItem("token")

    if (data != null && data != "") {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }

  }

}
