import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  url: string = "";

  constructor(private http: HttpClient) { }

  getAllTestsFiltered(studentId:number){
    this.url = environment.serverUrl + "/Test/getAllTestsFiltered/" + studentId.toString();
    return this.http.get(this.url);
  }

  getAllTests(){
    this.url = environment.serverUrl + "/Test/getTestsByClass/1";
    return this.http.get(this.url);
  }

  getStudentsGrades(schoolClass: string){
    this.url = environment.serverUrl + "/Test/GetStudentsGrades/" + schoolClass;
    return this.http.get(this.url);
  }
}
