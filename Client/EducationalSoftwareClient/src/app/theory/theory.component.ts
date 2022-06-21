import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theory',
  templateUrl: './theory.component.html',
  styleUrls: ['./theory.component.css']
})
export class TheoryComponent implements OnInit {
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
