import { Component } from '@angular/core';
import { Register } from './register/register';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'groupappblog';
  constructor( public _authService: LoginService, private _router: Router) {
  }
  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['./login']);
  }


}
