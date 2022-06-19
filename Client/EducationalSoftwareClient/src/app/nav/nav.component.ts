import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input()
  userType: string = "";
  opened = false;
  isLoggedIn?: boolean = false;
  constructor(private router: Router, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.auth.checkLoginStatus
      .subscribe(result => (this.isLoggedIn = result, console.log(result)));
    if (localStorage.getItem("userType") == "0") {
      this.userType = "Student"
    }
    else if (localStorage.getItem("userType") == "1" )
      this.userType = "Teacher"
    }

  logOut(): void {
    this.auth.logOut();
    localStorage.clear();
  }
}

  

 
