import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { Chapter } from '../models/chapter';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  url: string = "";

  constructor(private http: HttpClient) { }

  getAllChapters(){
    this.url = environment.serverUrl + "/Chapter/GetAllChapters";
    return this.http.get(this.url);
  }

  getStudentsGrades(schoolClass: string){
    this.url = environment.serverUrl + "/Chapter/GetStudentsGrades/" + schoolClass;
    return this.http.get(this.url);
  }

  createNewChapter(chapter: Chapter){
    this.url = environment.serverUrl + "/Chapter/CreateNewTest";
    return this.http.post(this.url, chapter);
  }
}
