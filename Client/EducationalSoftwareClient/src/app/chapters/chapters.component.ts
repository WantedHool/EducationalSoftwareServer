import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChapterService } from '../services/chapter-service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

  constructor(private router: Router, private chapterSrv: ChapterService) { }
  url = "../assets/dcc.pdf";
  dataSource?: any;
  userType?: string;

  ngOnInit(): void {
    if (localStorage.getItem("userType") == "0"){
      this.userType = 'Student';
    }
    else if (localStorage.getItem("userType") == "1" ){
      this.userType = 'Teacher';
    }
    this.chapterSrv.getAllChapters().subscribe(x => {console.log(x) 
       this.dataSource = x});
  }

}
