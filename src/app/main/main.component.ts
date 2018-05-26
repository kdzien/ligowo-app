import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

import { GrouptitleService } from '../services/grouptitle.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private user: User;
  private titleH: string;
  constructor(private authService: AuthenticationService, private router: Router, private groupTitle: GrouptitleService) {
  }

  ngOnInit() {
    this.groupTitle.getTitle().subscribe(title => {
      this.titleH = title;
    });
    this.authService.getUserData().subscribe(user => {
      this.user = user;
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
