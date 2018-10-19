import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  constructor(private _authService: RegisterService, private _router: Router) {

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
