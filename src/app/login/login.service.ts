import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _loginUrl = '/api/login';
  constructor(private http: Http) {}

  loginUser(user) {
    return this.http
      .post(this._loginUrl, user)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.error(errMsg); // log to console instead
  }


  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
