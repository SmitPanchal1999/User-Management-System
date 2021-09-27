import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if ((sessionStorage.getItem("loggedIn")=="true" && sessionStorage.getItem("userid")!==null)){
        this.router.navigate(['/products']);
        return false
      }
      if ((sessionStorage.getItem("admin")=="true" && sessionStorage.getItem("loggedIn")=="true")){
        this.router.navigate(['/users']);
        return false
      }
      return true
  }
  
}
