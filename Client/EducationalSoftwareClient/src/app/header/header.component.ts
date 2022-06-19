import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  title?: string;
  @Input()
  icon?: string;
  @Input()
  userId?: number;
  userType: string = "";
  isLoggedIn?: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.checkLoginStatus.subscribe(result => (this.isLoggedIn = result));
  if (localStorage.getItem("userType") == "0") {
    this.userType = "Student"
  }
  else if (localStorage.getItem("userType") == "1" )
    this.userType = "Teacher"
}
}