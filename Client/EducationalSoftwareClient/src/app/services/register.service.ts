import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Student } from '../models/student';
import { RegisterTeacherData } from '../models/registerTeacherData';
import { RegisterStudentData } from '../models/registerStudentData';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url : string = "";
  
  constructor(private http:HttpClient) { }

  registerStudent(student: RegisterStudentData){
    this.url = environment.serverUrl + "/Login/RegisterStudent";
    return this.http.post(this.url, {student});
  }

  registerTeacher(teacher: RegisterTeacherData){
    this.url = environment.serverUrl + "/Login/RegisterTeacher";
    return this.http.post(this.url, teacher);
  }
}


