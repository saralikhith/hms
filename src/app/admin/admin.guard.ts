import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private route:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token=localStorage.getItem('token')
      if(token==undefined){
    
        this.route.navigateByUrl('/login')
        return false
      }
      token=atob(token.split('.')[1])
      let tok=JSON.parse(token)
      let tokenType=tok.type
      console.log(tokenType)
      if(tokenType!='admin'){
      
        this.route.navigateByUrl('/page-not-found')
        return false
      }
    
    return true;
  }
  
  }
  

