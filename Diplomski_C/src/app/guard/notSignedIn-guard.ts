import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class UserNotSignedInGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if(localStorage.jwt) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}