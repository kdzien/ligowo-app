import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate() {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));
    if (current_user) {
      return true;
    } else{
      this.router.navigate([``]);
      return false;
    }
  }
}
