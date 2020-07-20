import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( 
    private auth: AuthService,
    private router: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.auth.LoginStatus) {
        this.router.navigate(['signin']);
      }
      return this.auth.LoginStatus;
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    //return this.checkLogin(url);
    if(!this.auth.LoginStatus) {
        this.router.navigate(['signin']);
      }
    return this.auth.LoginStatus;
  }

}
