import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class CanActivateNotification implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    
    if(localStorage.role == 'Admin' || localStorage.role == 'Controller') {
      return true;
    }
    else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}