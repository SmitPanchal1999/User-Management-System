import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.router.url);
    /*   if(this.router.url=="/login"){
        if ((sessionStorage.getItem("admin")=="true" && sessionStorage.getItem("loggedIn")=="true")){
          this.router.navigate(["/users"]);
        }
        else if ((sessionStorage.getItem("loggedIn")=="true" && sessionStorage.getItem("userid")!==null)){
          this.router.navigate(["/products"]);
        }
        return true;
      }
      else{ */
      if ((sessionStorage.getItem("admin")=="true" && sessionStorage.getItem("loggedIn")=="true")){
        console.log("from auth guard true");
        return true
      }
    
      this.router.navigate(['/login']);
      console.log("from auth guard false");
      return false;
    /* } */
  }
  
}
