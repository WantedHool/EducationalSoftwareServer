import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../interfaces/user';
import { RoleMapping, UserType } from '../interfaces/userType';
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
  public roles;
  selectedRole: UserType = UserType.Teacher;
  user: User = {
    userId: 0,
    username:'',
    password:'',
    userType: ""
  };
  constructor(private loginService: LoginService, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
    this.roles = RoleMapping;
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.loginSubscription = this.loginService.login(this.user)
      .subscribe((data) => {
        this.auth.changeLoginStatusTrue();
        localStorage.setItem("profileType", data.userType.toString());
        this.snackBar.open("Login successfull!","OK",{duration:5000})
        this.router.navigate(['/home']);
        
      },(err) => {
        this.snackBar.open("Wrong username or password","OK",{duration:5000})
      });
  }

  goToRegister(): void {
    this.router.navigate(["/register/" + this.roles[this.selectedRole].type]);
  }

  handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) this.snackBar.open("A Client-Side error occured!", "OK", { duration: 5000 });
    else this.snackBar.open(error.error, "OK", { duration: 5000 })
  }
}

