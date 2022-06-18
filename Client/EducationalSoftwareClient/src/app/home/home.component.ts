import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userType: string = "";

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem("userType") == "Student") {
      this.userType = "Student"
    }
    else if (localStorage.getItem("userType") == "Teacher")
      this.userType = "Teacher"
  }

}
