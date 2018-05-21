import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>('/api/Users/login', {email: email, password: password} ).map(user => {
      if (user && user.id) {
          localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
  });
  }
}
