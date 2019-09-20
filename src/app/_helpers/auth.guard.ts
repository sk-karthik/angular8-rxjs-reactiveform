import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.loggedIn;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

//https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial#auth-guard-ts

//https://www.tektutorialshub.com/angular/angular-canactivate-guard-example/
//https://www.freakyjolly.com/angular-7-6-use-auth-guards-canactivate-and-resolve-in-angular-routing-quick-example/
//https://www.techiediaries.com/angular-course-router-guards/