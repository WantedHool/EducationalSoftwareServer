import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "";

  constructor(private http: HttpClient) { }

  login(data: User):Observable<User> {
    this.url = environment.serverUrl + "/User/Login";
    return this.http.post<User>(this.url, data);
  }

  register(data: User) {
    this.url = environment.serverUrl + "/User/Register";
    return this.http.post(this.url, data);
  }

  getStudentByUserId(userId: number) {
    this.url = environment.serverUrl + "/User/GetStudentByUserId/" + userId.toString();
    return this.http.get(this.url);
  }
  
  getTeacherByUserId(userId: number) {
    this.url = environment.serverUrl + "/User/GetTeacherByUserId/" + userId.toString();
    return this.http.get(this.url);
  }
}
