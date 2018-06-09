import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router){
  }
  canActivate() {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));
    if (!current_user) {
      return true;
    } else{
      this.router.navigate([`main`]);
      return false;
    }
  }
}
