import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Register } from './register/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = '/api/register';

  constructor(private http: Http) {}


  registerUser(newUser: Register): Promise<void | Register> {
    return this.http
      .post(this._registerUrl, newUser)
      .toPromise()
      .then(response => response.json() as Register)
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
}
