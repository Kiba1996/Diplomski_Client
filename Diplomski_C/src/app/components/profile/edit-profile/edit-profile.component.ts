import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RegModel } from 'src/app/model/regModel';
import { NgForm } from '@angular/forms';
import { ProfileComponent } from '../profile.component';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

//, private usersService: UserProfileService, private fileServ: FileUploadService, private notificationServ: NotificationService

  user : any;
  selectedImage: any;
  formd: FormData = new FormData();
   pass: string = "";

  // editProfileForm = this.fb.group({
   
  //   Password: ['',
  //     [Validators.required,
  //     Validators.minLength(6),
  //     Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]],
  //   ConfirmPassword: ['',
  //     Validators.required],
  //   Email: ['',
  //     [Validators.email]],
  //   Name: ['',
  //     Validators.required],
  //   Surname: ['',
  //     Validators.required],
  //   Address: ['',
  //     Validators.required],
  //   Birthday: ['', Validators.required],
  //   PassengerType: ['Regular', Validators.required]
  // },
  // { validators: ConfirmPasswordValidator }
  //  );


  constructor(private route: ActivatedRoute, private router:Router, public auth: AuthenticationService, public accountServ: AccountService) 
  { 
  
    this.requestUserInfo()
  }

  ngOnInit() {
  }
  requestUserInfo(){
    //this.usersService.getUserClaims().subscribe(claims => {
      this.auth.profile().subscribe(data => {
        
          this.user = data;   
          this.accountServ.getPassengerTypes().subscribe(dat =>{
            dat.forEach(element => {
              if(element._id == data.passengerType){
                this.pass = element.name;
              }
            });
          });
          let str = this.user.birthday;
          this.user.birthday = str.split('T')[0];
          console.log(this.user);    
      });
     
   // });
  }
    onFileSelected(event){
    this.selectedImage = event.target.files[0];
   
  }

  Button1(userr: RegModel, form: NgForm)
  {
    let errorss = [];
   
   
    this.formd.append("name",form.value.Name);
    this.formd.append("surname",form.value.Surname);
    this.formd.append("email",form.value.Email);
    this.formd.append("password",form.value.Password);
    this.formd.append("address",form.value.Address);
    this.formd.append("birthday",form.value.Birthday);
    this.formd.append("Id",this.user._id);
    //if (this.selectedImage == undefined){

      // this.credentials.name = this.registerForm.value.Name;
      // this.credentials.surname = this.registerForm.value.Surname;
      // this.credentials.email = this.registerForm.value.Email;
      // this.credentials.password = this.registerForm.value.Password;
      // this.credentials.address = this.registerForm.value.Address;
      // this.credentials.birthday = this.registerForm.value.Birthday;
      // this.credentials.passengerType = this.registerForm.value.PassengerType;
      // this.credentials.role = "AppUser"
  
      //   this.credentials.activated  = "NOT ACTIVATED";
        
    if(this.selectedImage!= undefined && this.selectedImage!=null){
      this.formd.append("file",this.selectedImage);
    }

      this.auth.edit(this.formd).subscribe(data =>{
      if(localStorage.getItem('name') != this.user.email)
      {
       localStorage.setItem('name', this.user.email);
      }
      window.alert("You successfully edited you account!");
      ProfileComponent.returned.next(false);
        this.router.navigate(['profile']);
        console.log("WTFFFFFFFFF");
      }, err =>
      {
        for(var key in err.error.ModelState)
        {
          for(var i = 0; i < err.error.ModelState[key].length; i++)
          {
              errorss.push(err.error.ModelState[key][i]);
          }
        }
        console.log(errorss);
        window.alert(errorss);
      } );
    
   // }else{
      // this.credentials.activated  = "PENDING";
          // this.fileServ.uploadFile(this.selectedImage)
          // .subscribe(data => {      
          //   //alert("Image uploaded.");  
          //   this.usersService.edit(userr).subscribe(data =>
          //     {
          //       if(localStorage.getItem('name') != this.user.Email)
          //       {
          //        localStorage.setItem('name', this.user.Email);
          //       }
          //       if(localStorage.getItem('role') == 'AppUser'){
          //         this.notificationServ.sendNotificationToController();
          //       }
          //       window.alert("You successfully edited you account!");
          //       ProfileComponent.returned.next(false);
          //       this.router.navigate(['profile']);
                
          //     }, err =>
          //     {
          //       for(var key in err.error.ModelState)
          //       {
          //         for(var i = 0; i < err.error.ModelState[key].length; i++)
          //         {
          //           errorss.push(err.error.ModelState[key][i]);
          //         }
          //       }
          //       console.log(errorss);
          //       window.alert(errorss);
          //     }
          //   );
            
          // }, err =>
          // {
          //   for(var key in err.error.ModelState)
          //   {
          //     for(var i = 0; i < err.error.ModelState[key].length; i++)
          //     {
          //       errorss.push(err.error.ModelState[key][i]);
          //     }
          //   }
          //   console.log(errorss);
          //   window.alert(errorss);
          // });
    //    }
   
  }
  Button2(pass: any, form:NgForm )
  {
    let errorss = [];
    let formdd = new FormData();
    formdd.append("oldPassword",pass.OldPassword);
    formdd.append("newPassword",pass.NewPassword);
    formdd.append("confirmPassword",pass.ConfirmPassword);
    formdd.append("Id",this.user._id);
        this.auth.editPassword(formdd).subscribe(data=>{
      window.alert("You successfully edited you account!");
      ProfileComponent.returned.next(false);
      this.router.navigate(['profile']);
    }, err =>
    {
      // for(var key in err.error.ModelState)
      // {
      //   for(var i = 0; i < err.error.ModelState[key].length; i++)
      //   {
      //     errorss.push(err.error.ModelState[key][i]);
      //   }
      // }
      console.log(err.error.message);
      window.alert(err.error.message);
    });
  }


}

