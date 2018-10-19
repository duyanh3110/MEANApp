import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req, next) {
    const tokenizedReq = req.clone({
      setHeaders : {
        Authorization : 'Bearer xx.yy.zz'
      }
    });
    return next.handle(tokenizedReq);
  }
}
