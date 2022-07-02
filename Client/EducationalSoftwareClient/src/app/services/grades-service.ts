import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  url: string = "";

  constructor(private http: HttpClient) { }

  getTestResultsByStudentId(studentId: Number){
    this.url = environment.serverUrl + "/Test/GetTestResultsByStudentId/" + studentId.toString();
    return this.http.get(this.url);
  }

  getStudentsGrades(schoolClass: string){
    this.url = environment.serverUrl + "/Test/GetStudentsGrades/" + schoolClass;
    return this.http.get(this.url);
  }
}
