import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Role } from './role';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RoleService {
modules:any=[];
  apiUrl = "http://localhost:3000/roles";
  constructor(private http: HttpClient) { }
  getRoles() {
    return this.http.get<Role[]>(this.apiUrl);
  }
  getRole(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Role>(url, httpOptions);
  }
  editRole(role) {
    const url = `${this.apiUrl}/edit`;
    return this.http.put(url, role, httpOptions);
  }
  addRole(user) {
    const url = `${this.apiUrl}/add`;
    return this.http.post(url, user, httpOptions);
  }
  deleteRole(id) {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
  getRoleName(rolename) {
    const url = `${this.apiUrl}/roleName/${rolename}`;
    return this.http.delete(url, httpOptions);
  }
  
   getModules(roles){

    console.log("inside roleservice");
    let rolesBody={
      roles:roles
    }
    
    const url=`${this.apiUrl}/modules`;

    return this.http.post<Role[]>(url,rolesBody,httpOptions);
    
    
  }
  getModulesSync(roles){

    console.log("inside roleservice");
    let rolesBody={
      roles:roles
    }
    
    const url=`${this.apiUrl}/modulesSync`;

    return this.http.post<Role[]>(url,rolesBody,httpOptions);
    
    
  }
  
 getStaticModules(){
    return this.modules;
  }
  editModuleExists(moduleName:string,id:string){
   
    const url=`${this.apiUrl}/moduleExist`;

    return this.http.post(url,{moduleName:moduleName,id:id},httpOptions);
  }
  createModuleExists(moduleName:string){
   
    const url=`${this.apiUrl}/moduleExist`;

    return this.http.post(url,{moduleName:moduleName},httpOptions);
  }

}
