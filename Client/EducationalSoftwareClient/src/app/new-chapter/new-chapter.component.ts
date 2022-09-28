import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../models/chapter';
import { ChapterService } from '../services/chapter-service';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent implements OnInit {
  chapter: Chapter = {
    chapterId: 0,
    class : 0,
    pdfLink: '',
    photoLink: '',
    description: ''
  }
  userType?: string;
  constructor(private chapterSrv: ChapterService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    console.log("geaaaaa");
    this.chapterSrv.createNewChapter(this.chapter).subscribe(_ => this.router.navigate(['home/Teacher/theory']))
    }
}
