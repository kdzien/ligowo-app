import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Group } from 'src/app/models/Group';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs/Observable';
import { Match } from '../models/Match';
import { Bet } from '../models/Bet';
import { Rank } from '../models/Rank';
@Injectable({
  providedIn: 'root'
})
export class LigowoService {
  private auth_token: string;
  private user_id: string;
  private base_url = 'http://infinite-inlet-55610.herokuapp.com';

  constructor(private http: HttpClient) {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.auth_token = current_user.id;
    this.user_id = current_user.userId;
  }

  getUserGroups (userid): Observable<any> {
    return this.http.get<any>(`${this.base_url}/api/groups/usergroups/${this.user_id}?access_token=${this.auth_token}`);
  }
  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.base_url}/api/groups/?access_token=${this.auth_token}`, group);
  }
  joinGroup(group_id, user_email): Observable<any> {
    return this.http.patch<any>(`${this.base_url}/api/groups/join/${group_id}/${user_email}?access_token=${this.auth_token}`, { } );
  }
  getGroupInfo(group_id): Observable<Group> {
    return this.http.get<Group>(`${this.base_url}/api/groups/${group_id}?access_token=${this.auth_token}`, {} );
  }
  getMatches(group_id): Observable<Array<Match>> {
    return this.http.get<Array<Match>>(
      `${this.base_url}/api/Matches/bets/${this.user_id}/${group_id}?access_token=${this.auth_token}`, {} );
  }
  getGroupMatches(group_id): Observable<Array<Match>> {
    return this.http.get<Array<Match>>(
      `${this.base_url}/api/Matches//bets/groupMatches/${group_id}?access_token=${this.auth_token}`, {} );
  }
  getFinalMatches(group_id): Observable<Array<Bet>> {
    return this.http.get<Array<Bet>>(
      `${this.base_url}/api/Matches/bets/userdone/${this.user_id}/${group_id}?access_token=${this.auth_token}`, {} );
  }
  getLeftMatches(group_id): Observable<Array<Bet>> {
    return this.http.get<Array<Bet>>(
      `${this.base_url}/api/Matches/bets/userleft/${this.user_id}/${group_id}?access_token=${this.auth_token}`, {} );
  }
  addMatch(matches): Observable<Array<Match>> {
    return this.http.post<Array<Match>>(`${this.base_url}/api/Matches`, matches);
  }
  addBet(bet): Observable<Bet> {
    bet.user_id = this.user_id;
    return this.http.post<Bet>(`${this.base_url}/api/Bets`, bet);
  }
  updateBet(bet, type): Observable<any> {
    return this.http.patch<any>(`${this.base_url}/api/Bets/updateBet/${bet.id}/${type}?access_token=${this.auth_token}`, {} );
  }
  updateMatch(match, score): Observable<any> {
    return this.http.patch<any>(`${this.base_url}/api/Matches/${match.id}?access_token=${this.auth_token}`, {score: score} );
  }
  updateRank(group_id): Observable<string> {
    return this.http.get<any>(`${this.base_url}/api/Matches/updateRank/${group_id}?access_token=${this.auth_token}`);
  }
  getRank(group_id): Observable<Array<Rank>> {
    return this.http.get<any>(`${this.base_url}/api/Ranks/${group_id}?access_token=${this.auth_token}`);
  }
}
