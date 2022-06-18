import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private logInStatus?;
  constructor(private router: Router) {
    this.logInStatus = localStorage.getItem("isLoggedIn");
    if (this.logInStatus == "true")
      this.isLoggedIn.next(true);
    else
      this.isLoggedIn.next(false);
  }

  logOut(): void {
    this.isLoggedIn.next(false);
    localStorage.removeItem("isLoggedIn");
  }

  changeLoginStatusTrue(): void {
    this.isLoggedIn.next(true);
    localStorage.setItem("isLoggedIn", "true");
  }

  get checkLoginStatus(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  /*
  setUsername(username: string) {
    localStorage.setItem("username", username);
  }

  get getUsername() {
    return localStorage.getItem("username");
  }
  */
}
