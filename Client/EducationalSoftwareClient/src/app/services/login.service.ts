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
    debugger
    this.url = environment.serverUrl + "/User/Login";

    return this.http.post<User>(this.url, data);
  }

  register(data: User) {
    this.url = environment.serverUrl + "/User/Register";

    return this.http.post(this.url, data);
  }
  
}
