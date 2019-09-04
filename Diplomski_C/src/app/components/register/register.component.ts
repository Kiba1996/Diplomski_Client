import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/model/validation/password-validator';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  types: any = [];
  formd: FormData = new FormData();
  registerForm = this.fb.group({
   
    Password: ['',
      [Validators.required,
      Validators.minLength(6),
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]],
    ConfirmPassword: ['',
      Validators.required],
    Email: ['',
      [Validators.email]],
    Name: ['',
      Validators.required],
    Surname: ['',
      Validators.required],
    Address: ['',
      Validators.required],
    Birthday: ['', Validators.required],
    PassengerType: ['Regular', Validators.required]
  },
  { validators: ConfirmPasswordValidator }
   );
   selectedImage: any = null;
   


  onFileSelected(event){
    this.selectedImage = event.target.files[0];
     
  }

  get f() 
  {
     return this.registerForm.controls; 
  }

  
  constructor(private auth: AuthenticationService, private router: Router, private fb: FormBuilder, private accountService: AccountService )
  {
    
    this.accountService.getPassengerTypes().subscribe(data => {
      this.types = data;
      
      console.log("Tipovi putnika: ", this.types);

    },
    err => {
      console.log(err.error.message);
    });
  }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.formd).subscribe(() => { //this.credentials
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err.error.message);
    });
  }

  Button() {
   this.formd = new FormData();
    this.formd.append("name",this.registerForm.value.Name);
    this.formd.append("surname",this.registerForm.value.Surname);
    this.formd.append("email",this.registerForm.value.Email);
    this.formd.append("password",this.registerForm.value.Password);
    this.formd.append("address",this.registerForm.value.Address);
    this.formd.append("birthday",this.registerForm.value.Birthday);
    this.formd.append("passengerType",this.registerForm.value.PassengerType);
    this.formd.append("role","AppUser");

    if (this.selectedImage == undefined || this.selectedImage == null){
      if(this.registerForm.value.PassengerType == "Regular"){
        this.formd.append("activated","ACTIVATED");
      }
      else{
        this.formd.append("activated","NOT ACTIVATED");
      }
     
      console.log("korisnik kog saljem: ", this.formd);
     
      this.register();
   
    }
    else{
      this.formd.append("activated","PENDING");
     
  
   this.formd.append("file",this.selectedImage, this.selectedImage.name);
      console.log("korisnik kog saljem: ", this.formd);
      this.register();
      
    }
  }

}