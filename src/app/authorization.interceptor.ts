import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event)=>{
        if(event instanceof HttpResponse){
          if(event.type==HttpEventType.Response && localStorage.getItem('user')!=null){
            
            if(event.body.message=='unauthorized access' || event.body=='something went wrong with authorization'){
              
                this.router.navigateByUrl('/page-not-found')
            }
          }}
          return event;
      }));
  }
}
