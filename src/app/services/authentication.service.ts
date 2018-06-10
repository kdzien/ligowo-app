import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
     private base_url = 'https://quiet-sea-36923.herokuapp.com';
    // private base_url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.base_url}/api/Users/login`, {email: email, password: password} ).map(user => {
      if (user && user.id) {
          localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    });
  }
  register(username: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.base_url}/api/Users`, {username: username, email: email, password: password} )
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.replace('/ligowo-app-dev');
  }
  getUserData(): Observable<User> {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<User>(`${this.base_url}/api/Users/${current_user.userId}?access_token=${current_user.id}`);
  }
}
