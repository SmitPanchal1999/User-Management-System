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
export class ExternalDataService {

  apiUrl = "http://localhost:8000/storeData";
  constructor(private http: HttpClient) { }
  getPatternData(pattern){
    let reqBody={
      pattern:pattern
    }
    const url = `${this.apiUrl}/pattern`;
    return this.http.post<Role[]>(url,reqBody ,httpOptions);
  }
  getData(id){
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url,httpOptions);
  }
  editData(userData){
    
    const url = `${this.apiUrl}/edit`;
    return this.http.put(url,userData,httpOptions);

  }
}
