import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token=localStorage.getItem('token')
    if(token!==null){
   const clonedObj = req.clone({
    headers: req.headers.set("AUTHORIZATION",`Bearer ${token}`)

   })
  
   return next.handle(clonedObj)
    }
    else{
      //if token not existed
     return next.handle(req)
    }
}
}
