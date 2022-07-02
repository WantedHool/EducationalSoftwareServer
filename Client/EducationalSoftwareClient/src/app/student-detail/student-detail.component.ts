import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { TestResult } from '../models/test-result';
import { GradesService } from '../services/grades-service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  dataSource?:any;
  displayedColumns: string[] = ['testId', 'totalGrade'];
  studentId?: Number;
  mo?: number;
  constructor(private router: Router, private snackBar: MatSnackBar, private gradesService: GradesService) { }

  ngOnInit(): void {
    this.studentId = Number(localStorage.getItem("studentIdDet")) ?? 0;
    this.gradesService.getTestResultsByStudentId(this.studentId).subscribe(x => {
      this.dataSource = x;
      const testResults = x as TestResult[];
      this.mo = testResults.map(y => y.totalGrade).reduce((sum, current) => sum + current, 0)/testResults.length;

    });
    
  }

}
