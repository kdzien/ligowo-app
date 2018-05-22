import { LigowoService } from './../services/ligowo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/Group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private group: Group;
  constructor(private route: ActivatedRoute, private ligowoService: LigowoService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.ligowoService.getGroupInfo(id).subscribe(group => {
      this.group = group;
    });
  }

  ngOnInit() {

  }

}
