import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username = '';
  password = '';
  email = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  register(): void {
    this.authService.register(this.username, this.email, this.password).subscribe(user => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      this.alertService.setMessage(err.error.error.message, () => {
        const ft = this.alertService.setMessage('', () => {});
      });
    });
  }
  ngOnInit() {
  }

}
