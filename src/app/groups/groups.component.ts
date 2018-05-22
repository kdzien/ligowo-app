import { Component, OnInit } from '@angular/core';
import { LigowoService } from 'src/app/services/ligowo.service';
import { Group } from 'src/app/models/Group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  private current_user: any;
  private groups: Array<Group>;
  newGroupName: string;
  joinedGroupID: string;
  constructor(private ligowoService: LigowoService, private router: Router) {
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
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
  }
  joinTo(): void {
    this.ligowoService.joinGroup(this.joinedGroupID, this.current_user.userId).subscribe(message => {
      console.log(message);
      this.getGroups();
    });
  }
  getGroups() {
    this.ligowoService.getUserGroups(this.current_user.userId).subscribe(groups => {
      console.log(groups);
      this.groups = groups.data;
    });
  }
  openGroup(group): void {
    this.router.navigate([`main/groups/${group.id}`]);
  }
  ngOnInit() {
    this.getGroups();
  }

}
