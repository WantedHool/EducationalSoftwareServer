import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { RoleMapping, UserType } from '../models/userType';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginSubscription: Subscription = new Subscription();
  currentUser?: Observable<User>;
  message?: string;
  public userTypes;
  selectedUser: UserType = UserType.Teacher;
  user: User = {
    userId: 0,
    username:'',
    password:'',
    userType: 0
  };
  constructor(private loginService: LoginService, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
    this.userTypes = RoleMapping;
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.loginSubscription = this.loginService.login(this.user)
      .subscribe((user) => {
        this.auth.changeLoginStatusTrue();
        if (user.userType === 0){
          this.loginService.getStudentByUserId(user.userId ?? 0).subscribe(x =>localStorage.setItem("student", JSON.stringify(x)));
          this.router.navigate(['/home/Student']);
        }
       else{
        const teacher = this.loginService.getTeacherByUserId(user.userId ?? 0);
          localStorage.setItem("teacher", JSON.stringify(teacher));
          this.router.navigate(['/home/Teacher']);
       }
       localStorage.setItem("userType",user.userType?.toString() ?? "");
        this.snackBar.open("Login successfull!","OK",{duration:5000}) 
      },(err) => {
        this.snackBar.open("Wrong username or password","OK",{duration:5000})
      });
  }

  goToRegister(): void {
    this.router.navigate(["/register/Student"]);
  }

  handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) this.snackBar.open("A Client-Side error occured!", "OK", { duration: 5000 });
    else this.snackBar.open(error.error, "OK", { duration: 5000 })
  }
}

