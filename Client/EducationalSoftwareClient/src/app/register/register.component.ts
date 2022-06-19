import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RegisterStudentData } from '../models/registerStudentData';
import { RegisterTeacherData } from '../models/registerTeacherData';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user.service';

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
  teacher: Teacher = new Teacher();
  student: Student = new Student();
  regStudent: RegisterStudentData = {}
  
  regTeacher: RegisterTeacherData = {
    user: this.user,
    teacher: this.teacher
  }
  constructor(private router: Router, private registerService: RegisterService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.router.url == "/register/Teacher"){
      this.userType = 1;
      this.user.userType = this.userType;
    }
    else if (this.router.url == "/register/Student"){
      this.userType = 0;
      this.user.userType = this.userType;
    }
  }

  onSubmit() {
    if (this.userType == 1) {
      this.regTeacher.user = this.user;
      this.regTeacher.teacher = this.teacher;
      this.registerService.registerTeacher(this.regTeacher).subscribe((success)=> {
        this.snackBar.open("Successfull register","Ok",{duration:5000});
      },
      (error)=> {
        this.snackBar.open("Register failed","Ok",{duration:5000});
      });
    }
    else{
      this.regStudent.username = this.user.username;
      this.regStudent.password = this.user.password;
      //this.regStudent.userType = this.user.userType;
      this.regStudent.firstName = this.student.name;
      this.regStudent.lastName = this.student.surname;

      this.registerService.registerStudent(this.regStudent).subscribe((success)=> {
        this.snackBar.open("Successfull register","Ok",{duration:5000});
      },
      (error)=> {
        this.snackBar.open("Register failed","Ok",{duration:5000});
      });
    }
  }

}
