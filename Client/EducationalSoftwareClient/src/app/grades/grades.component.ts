import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { Test } from '../models/test';
import { TestResult } from '../models/test-result';
import { GradesService } from '../services/grades-service';
import { TestsService } from '../services/tests-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  userType: string = "";
  
  dataSource?:any;
  student?: Student = new Student();
  tests: Test[] = [];
  students: Student[] = [];
  mo: number = 0;
  displayedColumns: string[] = ['testId', 'totalGrade'];
  displayedColumns2: string[] = ['studentId', 'totalGrade','details'];

  constructor(private router: Router, private snackBar: MatSnackBar, private gradesService: GradesService, private testService: TestsService, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem("userType") == "0") {
      this.userType = "Student"
      this.student = JSON.parse(localStorage.getItem("student") ?? '') as Student;
      this.gradesService.getTestResultsByStudentId(this.student.studentId ?? 0).subscribe(x => {
        this.dataSource = x;
        const testResults = x as TestResult[];
        this.mo = testResults.map(y => y.totalGrade).reduce((sum, current) => sum + current, 0)/testResults.length;

      });
      this.testService.getAllTests().subscribe(x => this.tests = x as Test[])

    }
    else if (localStorage.getItem("userType") == "1" )
    this.gradesService.getStudentsGrades("A").subscribe(x => {
      this.dataSource = x;
      console.log(this.dataSource);
      this.userType = "Teacher"
    });
    this.userService.getAllStudents().subscribe(x => this.students = x as Student[])

  }
  openDetail(element: number){
    localStorage.setItem('studentIdDet', element.toString());
    this.router.navigate(['/home/Student/GradeDetail']);
    console.log(element);
  }

  openPdf(){
    window.open("file:///C:/Users/TITOS/Downloads/programma_eksetaseon.pdf");
  }

  getTestDesc(testId: number){
    return this.tests.find(x => x.testId === testId)?.description;
  }

  getStudentName(studentId: number){
    return this.students.find(x => x.studentId === studentId)?.firstName + " " + this.students.find(x => x.studentId === studentId)?.lastName
  }
}
