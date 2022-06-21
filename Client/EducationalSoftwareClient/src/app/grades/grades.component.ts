import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  userType: string = "";

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem("userType") == "0") {
      this.userType = "Student"
    }
    else if (localStorage.getItem("userType") == "1" )
      this.userType = "Teacher"
  }
}
