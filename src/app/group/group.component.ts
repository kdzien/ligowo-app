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
        height: '99px',
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
  private newMatches: Array<Match> = [{name: '', date: '', time: ''}];
  private group_id: string;
  private current_user: string;
  private newUserEmail: string;

  constructor(private route: ActivatedRoute, private ligowoService: LigowoService, private groupTitle: GrouptitleService,
  private alertService: AlertService) {

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
    this.refresh(() => {

    });
  }
  getGroupMatches(id: string) {
    return new Promise((resolve,reject) => {
      this.ligowoService.getGroupMatches(id).subscribe(matches => {
        this.groupMatches = matches;
        resolve();
      });
    })
  }
  getMatches(id: string) {
    return new Promise((resolve,reject) => {
      this.ligowoService.getMatches(id).subscribe(matches => {
        this.matches = matches;
        resolve();
      });
    })
  }
  getFinalMatches(id: string) {
    return new Promise((resolve, reject) => {
      this.ligowoService.getFinalMatches(id).subscribe(finalMatches => {
        this.finalMatches = finalMatches;
        resolve();
      });
    });
  }
  getLeftMatches(id: string) {
    return new Promise((resolve,reject) => {
      this.ligowoService.getLeftMatches(id).subscribe(leftMatches => {
        this.leftMatches = leftMatches;
        resolve();
      });
    });
  }
  getRank(id: string) {
    return new Promise((resolve,reject) => {
      this.ligowoService.getRank(id).subscribe(ranks => {
        this.ranks = ranks;
        resolve();
      });
    });
  }
  addMatch(): void {
    this.newMatches.push({name: '', date: '', time: ''});
  }
  sendMatches(): void {
    this.alertService.showModal();
    this.ligowoService.addMatch(this.newMatches, this.group_id).subscribe(match => {
      this.newMatches = [{name: '', date: '', time: ''}];
        this.refresh(() => {
          this.alertService.setMessage('Dodano mecze', () => {
            const ft = this.alertService.setMessage('', () => {});
          });
        });
    }, err => {
      this.alertService.hideModal();
        this.alertService.setMessage(err.error.error.message, () => {
          const ft = this.alertService.setMessage('', () => {});
        });
    });
  }
  updateRank(): void {
    this.alertService.showModal();
    this.ligowoService.updateRank(this.group_id).subscribe(status => {
        this.refresh(() => {
          this.alertService.setMessage(status, () => {
            const ft = this.alertService.setMessage('', () => {});
          });
        });
    });
  }
  updateMatch(match, score): void {
    this.alertService.showModal();
    this.ligowoService.updateMatch(match, score).subscribe(matchs => {
      this.refresh(() => {
      });
    });
  }

  betMatch(match, type): void {
    this.alertService.showModal();
    const newBet: Bet = {
      type: type,
      status: 0,
      date: match.date,
      matchId: match.id
    };
    this.ligowoService.addBet(newBet).subscribe(bet => {
      this.refresh(() => {

      });
    });
  }
  updateBet(bet, type): void {
    this.alertService.showModal();
    this.ligowoService.updateBet(bet, type).subscribe(betx => {
      this.refresh(() => {

      });
    }, err => {
        this.refresh(() => {
          this.alertService.setMessage(err.error.error.message, () => {
            const ft = this.alertService.setMessage('', () => {});
          });
        });
    });
  }

  joinUser(): void {
    this.ligowoService.joinGroup(this.group_id, this.newUserEmail).subscribe(message => {
      this.alertService.setMessage('Dodano użytkownika', () => {
        const ft = this.alertService.setMessage('', () => {});
      });
    }, err => {
      console.log(err);
      this.alertService.setMessage(err.error.error.message, () => {
        const ft = this.alertService.setMessage('', () => {});
      });
    });
  }

  refresh(cb): void {
    this.alertService.showModal();
    Promise.all([this.getMatches(this.group_id), this.getLeftMatches(this.group_id),
      this.getFinalMatches(this.group_id), this.getGroupMatches(this.group_id), this.getRank(this.group_id)])
      .then(() => {
        this.alertService.hideModal();
        cb();
      });
  }
  showAdminPanel() {
    this.adminPanel = (this.adminPanel === 'hide' ? 'show' : 'hide');
  }
}
