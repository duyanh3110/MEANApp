import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _registerUrl = '/api/register';

  constructor(private http: Http) {}

  registerUser(newUser) {
    return this.http
      .post(this._registerUrl, newUser)
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
