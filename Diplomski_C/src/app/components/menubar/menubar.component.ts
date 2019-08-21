import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  prom: string;
  userr: any;
  
  constructor( private router: Router, public auth: AuthenticationService) { }

  ngOnInit() {
  }
  // loggedIn():string{
  //   if(localStorage.jwt){
   
    
  // }
  //   return localStorage.jwt;
  // }

  logout() {
    this.auth.logout();
    this.prom = "";
    
    this.router.navigate(["login"]);
  }
  get user(): any {
    return localStorage.getItem('role');
  }

  
  
}
