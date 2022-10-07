import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Student } from '../models/student';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user.service';

interface StudentClass {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userType: number = 0;

  user: User = {
    userId: 0,
    username: "",
    password: "",
    userType : 0
  }

  studentClasses: StudentClass[] = [
    {value: '1', viewValue: 'A-Δημοτικού'},
    {value: '2', viewValue: 'Β-Δημοτικού'},
    {value: '3', viewValue: 'Γ-Δημοτικού'},
    {value: '4', viewValue: 'Δ-Δημοτικού'},
    {value: '5', viewValue: 'Ε-Δημοτικού'},
    {value: '6', viewValue: 'Στ-Δημοτικού'}
  ];

  student: Student = new Student();

  constructor(private router: Router, private registerService: RegisterService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.router.url == "/register/Student"){
      this.userType = 0;
      this.user.userType = this.userType;
    }
  }

  onSubmit() {
      this.registerService.registerStudent(this.student).subscribe((success)=> {
        this.snackBar.open("Successfull register","Ok",{duration:5000});
      },
      (error)=> {
        this.snackBar.open("Register failed","Ok",{duration:5000});
      });
    }

}
