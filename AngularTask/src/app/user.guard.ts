import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
        if ((sessionStorage.getItem("loggedIn")=="true" && sessionStorage.getItem("userid")!==null)){
          console.log("from user guard true");
          return true
        }
      
        this.router.navigate(['/login']);
        console.log("from user guard false");
        return false;
  }
  
}
