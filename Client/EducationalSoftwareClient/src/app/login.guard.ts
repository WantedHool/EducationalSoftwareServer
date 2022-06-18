import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn?: Observable<boolean>;
  canNavigate: boolean = false;
  constructor(private auth: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.isLoggedIn = this.auth.checkLoginStatus;
    this.isLoggedIn.subscribe((result) => (this.canNavigate = result, console.log(result)));

    return this.canNavigate;
  }
}
