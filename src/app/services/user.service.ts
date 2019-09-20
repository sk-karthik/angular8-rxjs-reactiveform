import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseAPIUrl = environment.baseAPIUrl;
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.post<User[]>(this.baseAPIUrl + 'user/list', {});
    }
    getProfile() {
        return this.http.get<User[]>(this.baseAPIUrl + 'user/profile');
    }
}

