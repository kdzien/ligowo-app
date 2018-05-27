import { LigowoService } from './../services/ligowo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/Group';
import { Observable } from 'rxjs/internal/Observable';
import { Match } from '../models/Match';
import { Bet } from '../models/Bet';
import { GrouptitleService } from '../services/grouptitle.service';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('hide', style({
        transform: 'translateX(-550px)',
        height: '102px',
      })),
      state('show', style({
        transform: 'translateX(0px)',
        height: '100%',
      })),
      transition('hide <=> show', animate('200ms ease-in')),
    ]),
  ]
})
export class GroupComponent implements OnInit {
  // animation
  private adminPanel = 'hide';
  //

  private group: Group;
  private matches: Array<Match>;
  private finalMatches: Array<Bet>;
  private leftMatches: Array<Bet>;
  private newMatches: Array<Match> = [{name: '', date: ''}];
  private group_id: string;
  private current_user: string;

  constructor(private route: ActivatedRoute, private ligowoService: LigowoService, private groupTitle: GrouptitleService,) {

  }
  ngOnDestroy(){
    this.groupTitle.setTitle('');
  }
  ngOnInit() {
    this.current_user = JSON.parse(localStorage.getItem('currentUser')).userId;
    this.group_id = this.route.snapshot.paramMap.get('id');
    this.ligowoService.getGroupInfo(this.group_id).subscribe(group => {
      this.group = group;
      this.groupTitle.setTitle(this.group.name);
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
      console.log(finalMatches);
      this.finalMatches = finalMatches;
    });
  }
  getLeftMatches(id: string): void {
    this.ligowoService.getLeftMatches(id).subscribe(leftMatches => {
      console.log(leftMatches);
      this.leftMatches = leftMatches;
    });
  }
  addMatch(): void {
    this.newMatches.push({name: '', date: ''});
    console.log(this.newMatches);
  }
  sendMatches(): void {
    // const newMatch: Match = {
    //   name: this.newMatchName,
    //   date: this.newMatchDate,
    //   group_id: this.group_id,
    // };
    // this.ligowoService.addMatch(newMatch).subscribe(match => {
    //   this.getMatches(this.group_id);
    // });
  }

  betMatch(match, type): void {
    const newBet: Bet = {
      type: type,
      status: 0,
      date: match.date,
      matchId: match.id
    };
    this.ligowoService.addBet(newBet).subscribe(bet => {
      this.refresh();
    });
  }
  updateBet(bet, type): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.ligowoService.upadteBet(bet, type).subscribe(bet => {
      this.refresh();
    });
  }
  refresh(): void {
    this.getMatches(this.group_id);
    this.getLeftMatches(this.group_id);
    this.getFinalMatches(this.group_id);
  }
  showAdminPanel() {
    this.adminPanel = (this.adminPanel === 'hide' ? 'show' : 'hide');
  }

}
