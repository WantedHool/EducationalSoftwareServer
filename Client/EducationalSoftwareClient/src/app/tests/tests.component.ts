import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { Test } from '../models/test';
import { TestsService } from '../services/tests-service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  userType: string = "";
  student: Student = new Student;
  dataSource?: any;

  constructor(private testsSrv: TestsService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem("userType") == "0") {
      this.userType = "Student"
      this.student = JSON.parse(localStorage.getItem("student") ?? '') as Student;
      this.testsSrv.getAllTestsFiltered(this.student.studentId ?? 0).subscribe(x =>{
        this.dataSource = x;
      });
    }
    else if (localStorage.getItem("userType") == "1" )
      this.userType = "Teacher"
  }

  addNewTest(): void {
    this.router.navigate(["home/Teacher/tests/newtest"]);
  }

  openTest(testId: number){
    let test = (this.dataSource as Test[]).find(x => x.testId === testId);
    localStorage.setItem('testId',testId.toString());
    this.router.navigate(['home/Student/Test']);
  }
}
