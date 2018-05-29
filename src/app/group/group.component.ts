import { LigowoService } from './../services/ligowo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/Group';
import { Observable } from 'rxjs/internal/Observable';
import { Match } from '../models/Match';
import { Bet } from '../models/Bet';
import { GrouptitleService } from '../services/grouptitle.service';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { Rank } from '../models/Rank';
import { AlertService } from 'src/app/services/alert.service';

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
  private ranks: Array<Rank>;
  private groupMatches: Array<Match>;
  private newMatches: Array<Match> = [{name: '', date: ''}];
  private group_id: string;
  private current_user: string;
  private newUserEmail: string;

  constructor(private route: ActivatedRoute, private ligowoService: LigowoService, private groupTitle: GrouptitleService,
  private alertService : AlertService) {

  }

  ngOnDestroy() {
    this.groupTitle.setTitle('');
  }
  ngOnInit() {
    this.current_user = JSON.parse(localStorage.getItem('currentUser')).userId;
    this.group_id = this.route.snapshot.paramMap.get('id');
    this.ligowoService.getGroupInfo(this.group_id).subscribe(group => {
      this.group = group;
      this.groupTitle.setTitle(this.group.name);
    });
    this.refresh();
  }
  getGroupMatches(id: string): void {
    this.ligowoService.getGroupMatches(id).subscribe(matches => {
      console.log(matches);
      this.groupMatches = matches;
    });
  }
  getMatches(id: string): void {
    this.ligowoService.getMatches(id).subscribe(matches => {
      this.matches = matches;
    });
  }
  getFinalMatches(id: string): void {
    this.ligowoService.getFinalMatches(id).subscribe(finalMatches => {
      this.finalMatches = finalMatches;
    });
  }
  getLeftMatches(id: string): void {
    this.ligowoService.getLeftMatches(id).subscribe(leftMatches => {
      this.leftMatches = leftMatches;
    });
  }
  getRank(id: string): void {
    this.ligowoService.getRank(id).subscribe(ranks => {
      this.ranks = ranks;
    });
  }
  addMatch(): void {
    this.newMatches.push({name: '', date: ''});
  }
  sendMatches(): void {
    // tslint:disable-next-line:prefer-const
    let tempMatchesArray = [];
    this.newMatches.forEach(elem => {
      // tslint:disable-next-line:max-line-length
      tempMatchesArray.push({group_id: this.group_id, name: elem.name, date: `${elem.date.replace(/-/g, '')}${elem.time.replace(/:/g, '')}`});
    });
    this.ligowoService.addMatch(tempMatchesArray).subscribe(match => {
      this.newMatches = [{name: '', date: ''}];
      this.refresh();
    });
  }
  updateRank(): void {
    this.ligowoService.updateRank(this.group_id).subscribe(status => {
      this.refresh();
      console.log(status);
    });
  }
  updateMatch(match, score): void {
    this.ligowoService.updateMatch(match, score).subscribe(matchs => {
      this.refresh();
    });
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
    this.ligowoService.updateBet(bet, type).subscribe(bet => {
    }, err => {
      this.alertService.setMessage(err.error.error.message, () => {
        const ft = this.alertService.setMessage('', () => {});
      });
    });
    this.refresh();
  }

  joinUser(): void {
    this.ligowoService.joinGroup(this.group_id, this.newUserEmail).subscribe(message => {
      this.alertService.setMessage('Dodano użytkownika', () => {
        const ft = this.alertService.setMessage('', () => {});
      });
    }, err => {
      console.log(err)
      this.alertService.setMessage(err.error.error.message, () => {
        const ft = this.alertService.setMessage('', () => {});
      });
    });
  }

  refresh(): void {
    this.getMatches(this.group_id);
    this.getLeftMatches(this.group_id);
    this.getFinalMatches(this.group_id);
    this.getGroupMatches(this.group_id);
    this.getRank(this.group_id);
  }
  showAdminPanel() {
    this.adminPanel = (this.adminPanel === 'hide' ? 'show' : 'hide');
  }
}
