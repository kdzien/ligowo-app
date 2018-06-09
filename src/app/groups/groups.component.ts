import { AlertService } from './../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { LigowoService } from 'src/app/services/ligowo.service';
import { Group } from 'src/app/models/Group';
import { Router } from '@angular/router';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  animations: [
    trigger('slideTop', [
      state('hide', style({
        top: '100%',
      })),
      state('show', style({
        top: '0%',
      })),
      transition('hide <=> show', animate('200ms ease-in')),
    ]),
  ]
})
export class GroupsComponent implements OnInit {
  private new_group_panel = 'hide';
  private current_user: any;
  private groups: Array<Group>;
  newGroupName: string;
  constructor(private ligowoService: LigowoService, private router: Router, private alertService: AlertService) {

  }
  addGroup(): void {
    const new_group: Group = {
      name: this.newGroupName,
      admin: this.current_user.userId,
      users: [this.current_user.userId]
    };
    this.alertService.showModal();
    this.ligowoService.addGroup(new_group).subscribe(group => {
      this.getGroups().then(() => {
        this.alertService.hideModal();
      });
    }, err => {
      console.log(err);
    });
    this.new_group_panel = 'hide';
    this.newGroupName = '';
  }
  getGroups() {
    return new Promise((resolve, reject) => {
      this.ligowoService.getUserGroups(this.current_user.userId).subscribe(groups => {
        this.groups = groups.data;
        resolve();
      });
    })
  }
  openGroup(group): void {
    this.router.navigate([`main/groups/${group.id}`]);
  }
  ngOnInit() {
    this.alertService.showModal();
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.getGroups().then(() => {
      this.alertService.hideModal();
    });
  }
  showNewGroupPanel() {
    this.new_group_panel = (this.new_group_panel === 'hide' ? 'show' : 'hide');
  }

}
