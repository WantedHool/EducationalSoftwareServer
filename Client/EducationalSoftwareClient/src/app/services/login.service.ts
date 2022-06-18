import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "";

  constructor(private http: HttpClient) { }

  login(data: User):Observable<User> {
    this.url = environment.serverUrl + "/Login/Login";

    return this.http.post<User>(this.url, data);
  }

  register(data: User) {
    this.url = environment.serverUrl + "/Login/Register";

    return this.http.post(this.url, data);
  }
  
}
