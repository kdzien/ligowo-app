import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: User;
  constructor(private authService : AuthenticationService,private router: Router) {
    this.authService.getUserData().subscribe(user=>{
      this.user=user;
    })
  }
  ngOnInit() {

  }
  logout() :void{
    this.authService.logout();
    this.router.navigate(['login']);
  }


}
