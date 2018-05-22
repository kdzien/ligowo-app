import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(user => {
      this.router.navigate(['main/groups']);
    }, err => {
      console.log(err);
    });
  }
}
