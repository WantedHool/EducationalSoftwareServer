import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url : string = "";
  
  constructor(private http:HttpClient) { }

  registerStudent(student: Student){
    this.url = environment.serverUrl + "/User/RegisterStudent";
    return this.http.post(this.url, student);
  }
}


