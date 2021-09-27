import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
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
export class UserService {
  apiUrl = "http://localhost:8080/users";
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUser(id: string): Observable<any> {

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url, httpOptions);

  }
  editUser(user) {
    const url = `${this.apiUrl}/edit`;
    return this.http.put(url, user, httpOptions);
  }
  addUser(user) {

    const url = `${this.apiUrl}/add`;
    return this.http.post(url, user, httpOptions);

  }
  deleteUser(id) {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
  checkUser(user) {

    const url = `${this.apiUrl}/checkUser`;
    return this.http.post<User>(url, user, httpOptions);

  }
}
