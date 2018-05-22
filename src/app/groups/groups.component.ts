import { Component, OnInit } from '@angular/core';
import { LigowoService } from 'src/app/services/ligowo.service';
import { Group } from 'src/app/models/Group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  private current_user : any;
  private groups : Array<Group>;
  joinedGroupID : string;
  constructor(private ligowoService : LigowoService) {
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
  }
  addGroup(){
    const new_group : Group = {
      name: "dupeczkaadi",
      admin: this.current_user.userId,
      users: [this.current_user.userId]
    };
    this.ligowoService.addGroup(new_group).subscribe(group =>{
      this.getGroups();
    },err=>{
      console.log(err)
    })
  }
  joinTo(){
    this.ligowoService.joinGroup(this.joinedGroupID,this.current_user.userId).subscribe(message=>{
      console.log(message);
      this.getGroups();
    })
  }
  getGroups(){
    let temp :any;
    this.ligowoService.getUserGroups(this.current_user.userId).subscribe(groups=>{

      this.groups = groups.data;
    })
  }
  ngOnInit() {
    this.getGroups();
  }

}
