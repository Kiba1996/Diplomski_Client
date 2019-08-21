import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class UserSignedInGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if(!localStorage.getItem('mean-token')) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}