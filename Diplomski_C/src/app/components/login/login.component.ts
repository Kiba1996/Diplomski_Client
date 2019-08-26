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
    //if(this.validations.validate(loginData)) return;
    this.formd.append("email",loginData.Email);
    this.formd.append("password",loginData.Password);
   
    this.auth.login(this.formd).subscribe(
      res => {

        this.auth.profile().subscribe(data => {
         
          let user = data;
          localStorage.setItem('role', user.role);
          localStorage.setItem('name', user.email);
        });

        // console.log(res.access_token);

        // let jwt = res.access_token;
        // let jwtData = jwt.split('.')[1]
        // let decodedJwtJasonData = window.atob(jwtData)
        // let decodetJwtData = JSON.parse(decodedJwtJasonData)

        // let rola = decodetJwtData.role

        // // console.log('jwtData: ' + jwtData)
        // // console.log('decodedJwtJsonData: ' + decodedJwtJasonData)
        // // console.log(decodetJwtData)
        // console.log('Role: ' + rola)
        // let a = decodetJwtData.unique_name
        // localStorage.setItem('jwt', jwt)
        // localStorage.setItem('role', rola)
        // console.log("iz storagea");
        // console.log(localStorage.getItem('role'))
        // localStorage.setItem('name',a);
        // //window.location.href = "/home"
        this.router.navigateByUrl('/home');
        
      },
      error => {
        console.log(error)
        alert("Wrong username or password");
        
      }
    );
    
  }
  
}

