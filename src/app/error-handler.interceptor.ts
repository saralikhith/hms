import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
         alert('server is not responding')
         this.router.navigateByUrl('/page-not-found')
        } 
        else if (error.status === 401 || error.status==403) {
          alert('unauthorized acess')
          localStorage.clear( )
          this.router.navigateByUrl('/login')
         } 
         else if(error.status==400){
               alert('request is very bad,please send the request again')
               
               
         }
        else {
           alert(error.message)
           localStorage.clear( )
           this.router.navigateByUrl('/login')
        }
        return throwError(error);
      })
    );
  }
}
