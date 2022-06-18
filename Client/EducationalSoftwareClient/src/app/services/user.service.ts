import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "";
  
  constructor(private http: HttpClient) { }

  selectById(id: number): Observable<User> {
    let params = new HttpParams().set("id", id);
    this.url = environment.serverUrl + "/User/SelectById"
    return this.http.get<User>(this.url, { params: params })
  }

  update(user: User){
    this.url = environment.serverUrl + "/User/Update";
    let params = new HttpParams().set("id", user.id);
    return this.http.put(this.url, user , {params:params});
  }

  getTeacherById(userId: number){
    let params = new HttpParams().set("userId", userId);
    this.url = environment.serverUrl + "/UserInterface/GetTeacherById"
    return this.http.get<Teacher>(this.url, {params:params});
  }

  getStudentsById(userId: number){
    let params = new HttpParams().set("userId", userId);
    this.url = environment.serverUrl + "/UserInterface/GetStudentById"
    return this.http.get<Student>(this.url, {params:params});
  }
}
