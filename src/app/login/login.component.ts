import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  loginUserData = {
    email: '',
    password: ''
  };

  constructor(private _auth: LoginService, private _router: Router) { }

  ngOnInit() { }

  loginUser() {
    this._auth
      .loginUser(this.loginUserData)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['../home']);
      }
        ,
        err => console.log(err));
  }
}
