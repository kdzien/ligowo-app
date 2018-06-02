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
  constructor(private ligowoService: LigowoService, private router: Router) {

  }
  addGroup(): void {
    const new_group: Group = {
      name: this.newGroupName,
      admin: this.current_user.userId,
      users: [this.current_user.userId]
    };
    this.ligowoService.addGroup(new_group).subscribe(group => {
      this.getGroups();
    }, err => {
      console.log(err);
    });
    this.new_group_panel = 'hide';
    this.newGroupName = '';
  }
  getGroups() {
    this.ligowoService.getUserGroups(this.current_user.userId).subscribe(groups => {
      this.groups = groups.data;
    });
  }
  openGroup(group): void {
    this.router.navigate([`main/groups/${group.id}`]);
  }
  ngOnInit() {
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.current_user);
    this.getGroups();
  }
  showNewGroupPanel() {
    this.new_group_panel = (this.new_group_panel === 'hide' ? 'show' : 'hide');
  }

}
