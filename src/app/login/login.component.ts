import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(user => {
      this.router.navigate(['main/groups']);
    }, err => {
      this.alertService.setMessage(err.error.error.message, () => {
        const ft = this.alertService.setMessage('', () => {});
      });
    });
  }
}
