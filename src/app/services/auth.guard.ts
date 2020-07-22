import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
// export class AuthGuard implements CanActivate {

//   constructor( 
//     private auth: AuthService,
//     private router: Router ) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//       if(!this.auth.LoginStatus) {
//         this.router.navigate(['signin']);
//       }
//       return this.auth.LoginStatus;
//   }
// }
@Injectable()
export class AuthGuard implements CanLoad {
  constructor(//private permissions: Permissions, private currentUser: UserToken
    private auth: AuthService,
    private router: Router ) {}

  // canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
  //   return this.permissions.canLoadChildren(this.currentUser, route, segments);  
  // }
  canLoad(route: Route): boolean {    
    let url: string = route.path;
    console.log('Url:'+ url);
    if(!this.auth.LoginStatus) {
        this.router.navigate(['login']);
      }
      return this.auth.LoginStatus;
  }
}