import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { User } from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseAPIUrl = environment.baseAPIUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('access_token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserVlaue(): User {
    return this.currentUserSubject.value;
  }

  /* User Login Authentication*/
  login(email: string, password: string) {
    // return this.httpClient.post<{ token: string }>(this.baseAPIUrl + 'user/login', { email, password })
    return this.httpClient.post<any>(this.baseAPIUrl + 'user/login', { email, password })
      .pipe(map(res => {
        localStorage.setItem('access_token', JSON.stringify(res)); //res.token
        this.currentUserSubject.next(res);
        //  return JSON.parse(res);
      }))
  }

  /* New User Registraion and Auto Login  */
  register(email: string, password: string) {
    return this.httpClient.post<{ token: string }>(this.baseAPIUrl + 'user/register', { email, password }).pipe(map(res => {
      this.login(email, password)
    }))
  }

  /* Session or User Logout  */
  logout() {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
  }

  /* Check user if Logged In   */
  public get loggedIn(): boolean {
    let tokenval = localStorage.getItem('access_token') !== null;
    if (tokenval) {
      tokenval = JSON.parse(localStorage.getItem('access_token'));
	  console.log(tokenval);
      return tokenval['token'];
    }
    return null;
  }

}

//https:/ / jasonwatmore.com / post / 2019 / 06 / 22 / angular - 8 - jwt - authentication - example - tutorial#jwt - interceptor - ts