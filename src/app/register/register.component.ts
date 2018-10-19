import { Component, OnInit, Input } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input()
  registerUserData = {
    email: '',
    password: ''
  };

  constructor(private _auth: RegisterService, private _router: Router) {}

  ngOnInit() {}

  registerUser() {
    this._auth
      .registerUser(this.registerUserData)
      .then(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['../home']);
      },
      err => console.log(err));
  }
}
