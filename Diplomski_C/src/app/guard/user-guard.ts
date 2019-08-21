import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class CanActivateUser implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    
    if(localStorage.role == 'AppUser' || !localStorage.jwt) {
      return true;
    }
    else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}