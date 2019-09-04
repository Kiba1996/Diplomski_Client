import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { RegModel } from 'src/app/model/regModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formd: FormData = new FormData();
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.formd).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    }); 
  }

  onSignIn(loginData: RegModel, form:NgForm){
    this.formd=new FormData();
    this.formd.append("email",loginData.Email);
    this.formd.append("password",loginData.Password);
   
    this.auth.login(this.formd).subscribe(
      res => {

        this.auth.profile().subscribe(data => {
         
          let user = data;
          localStorage.setItem('role', user.role);
          localStorage.setItem('name', user.email);
        });

        this.router.navigateByUrl('/home');
        
      },
      error => {
        console.log(error.error.message)
        alert("Wrong username or password");
        
      }
    );
    
  }
  
}

