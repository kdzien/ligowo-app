import { LigowoService } from './../services/ligowo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/Group';
import { Observable } from 'rxjs/internal/Observable';
import { Match } from '../models/Match';
import { Bet } from '../models/Bet';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private group: Group;
  private matches: Array<Match>;
  private finalMatches: Array<Bet>;
  private leftMatches: Array<Bet>;
  private group_id: string;
  private current_user: string;
  private newMatchName: string;
  private newMatchDate: string;
  constructor(private route: ActivatedRoute, private ligowoService: LigowoService) {

  }

  ngOnInit() {
    this.current_user = JSON.parse(localStorage.getItem('currentUser')).userId;
    this.group_id = this.route.snapshot.paramMap.get('id');
    this.ligowoService.getGroupInfo(this.group_id).subscribe(group => {
      this.group = group;
    });
    this.getMatches(this.group_id);
    this.getFinalMatches(this.group_id);
    this.getLeftMatches(this.group_id);
  }
  getMatches(id: string): void {
    this.ligowoService.getMatches(id).subscribe(matches => {
      this.matches = matches;
    });
  }
  getFinalMatches(id: string): void {
    this.ligowoService.getFinalMatches(id).subscribe(finalMatches => {
      console.log(finalMatches)
      this.finalMatches = finalMatches;
    });
  }
  getLeftMatches(id: string): void {
    this.ligowoService.getLeftMatches(id).subscribe(leftMatches => {
      console.log(leftMatches)
      this.leftMatches = leftMatches;
    });
  }
  addMatch(): void {
    const newMatch: Match = {
      name: this.newMatchName,
      date: this.newMatchDate,
      group_id: this.group_id,
    };
    this.ligowoService.addMatch(newMatch).subscribe(match => {
      this.getMatches(this.group_id);
    });
  }

  betMatch(match, bet): void {
    const newBet: Bet = {
      type: bet,
      status: 0,
      date: match.date,
      matchId: match.id
    }
    this.ligowoService.addBet(newBet).subscribe(bet => {
      this.refresh();
    })
  }
  refresh(): void{
    this.getMatches(this.group_id);
    this.getLeftMatches(this.group_id);
    this.getFinalMatches(this.group_id);
  }


}
