import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (private _authService: LoginService, private _router: Router) {

  }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['../login']);
      return false;
    }
  }
}
