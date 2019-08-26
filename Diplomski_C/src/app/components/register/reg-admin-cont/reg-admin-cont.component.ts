import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/model/validation/password-validator';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RegModel } from 'src/app/model/regModel';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-admin-cont',
  templateUrl: './reg-admin-cont.component.html',
  styleUrls: ['./reg-admin-cont.component.css']
})
export class RegAdminContComponent implements OnInit {
  formd: FormData = new FormData();
  serverErrors: string[];
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
     Role: ['Admin', Validators.required]
  },
  { validators: ConfirmPasswordValidator }
   );


  get f() 
  {
     return this.registerForm.controls; 
  }


  
 
//private notificationServ: NotificationService,

  constructor(private fb: FormBuilder, private accountService: AuthenticationService, private router: Router) { 
 
  }



  ngOnInit() {
  }


  register() {
    this.accountService.register(this.formd).subscribe(() => {
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }

  Button1() {
    let regModel: RegModel = this.registerForm.value;
    let formData: FormData = new FormData();


    this.formd.append("name",this.registerForm.value.Name);
    this.formd.append("surname",this.registerForm.value.Surname);
    this.formd.append("email",this.registerForm.value.Email);
    this.formd.append("password",this.registerForm.value.Password);
    this.formd.append("address",this.registerForm.value.Address);
    this.formd.append("birthday",this.registerForm.value.Birthday);
    this.formd.append("role", this.registerForm.value.Role);
    this.formd.append("activated","PENDING");

   
   
    this.register();

   
    // this.accountService.register(regModel).subscribe(
    //   ret => {
    //     this.serverErrors = [];
    //     this.notificationServ.sendNotification();
    //     this.router.navigateByUrl('/signin');

    //   },
    //   err => {
    //     console.log(err);
    //     window.alert(err.error.ModelState[""]);
    //     this.serverErrors = err.error.ModelState[""]

    //   }
    // );
    
   

    
  }


}

