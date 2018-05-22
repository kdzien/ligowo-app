import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = '';
  password = "";
  email = "";
  constructor(
    private authService : AuthenticationService,
    private router: Router
  ) { }

  register() :void {
    console.log(this.username)
    this.authService.register(this.username,this.email,this.password).subscribe(user=>{
      this.router.navigate(['/login']);
    },err=>{
      console.log(err)
    })
  }
  ngOnInit() {
  }

}
