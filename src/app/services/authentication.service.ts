import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/Users/login', {email: email, password: password} ).map(user => {
      if (user && user.id) {
          localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    });
  }
  register(username: string, email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/Users', {username: username, email: email, password: password} )
  }

  logout(){
    localStorage.removeItem('currentUser');
    window.location.replace('/login');
  }
  getUserData(): Observable<User> {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<User>(`http://localhost:3000/api/Users/${current_user.userId}?access_token=${current_user.id}`);
  }
}
