import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Group } from 'src/app/models/Group';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class LigowoService {
  private auth_token: string;

  constructor(private http: HttpClient) {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.auth_token = current_user.id;
  }

  getUserGroups (userid): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/groups/usergroups/${userid}?access_token=${this.auth_token}`);
  }
  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`http://localhost:3000/api/groups/?access_token=${this.auth_token}`, group);
  }
  joinGroup(group_id, user_id): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/api/groups/join/${group_id}/${user_id}?access_token=${this.auth_token}`, { } );
  }
  getGroupInfo(group_id): Observable<Group> {
    return this.http.get<Group>(`http://localhost:3000/api/groups/${group_id}?access_token=${this.auth_token}`, {} );
  }
}
