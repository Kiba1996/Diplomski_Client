import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RegModel } from 'src/app/model/regModel';
import { NgForm } from '@angular/forms';
import { ProfileComponent } from '../profile.component';
import { TokenPayload } from 'src/app/model/tokenPayload';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

//, private usersService: UserProfileService, private fileServ: FileUploadService, private notificationServ: NotificationService

  user : any;
  selectedImage: any;
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    surname: '',
    address: '',
    birthday: new Date(),
    image: '',
    activated: '',
    role: 'AppUser',
    passengerType: ''
  };

  constructor(private route: ActivatedRoute, private router:Router, public auth: AuthenticationService) 
  { 
  
    this.requestUserInfo()
  }

  ngOnInit() {
  }
  requestUserInfo(){
    //this.usersService.getUserClaims().subscribe(claims => {
      this.auth.profile().subscribe(data => {
        
          this.user = data;    
          let str = this.user.birthday;
          this.user.birthday = str.split('T')[0];
          console.log(this.user);    
      });
     
   // });
  }

  Button1(userr: RegModel, form: NgForm)
  {
    userr.Id = this.user._id;
    let errorss = [];
    
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
        


      this.auth.edit(userr).subscribe(data =>{
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
  // Button2(pass: ChangePasswordModel, form:NgForm )
  // {
  //   let errorss = [];
  //   this.usersService.editPassword(pass).subscribe(data=>{
  //     window.alert("You successfully edited you account!");
  //     ProfileComponent.returned.next(false);
  //     this.router.navigate(['profile']);
  //   }, err =>
  //   {
  //     for(var key in err.error.ModelState)
  //     {
  //       for(var i = 0; i < err.error.ModelState[key].length; i++)
  //       {
  //         errorss.push(err.error.ModelState[key][i]);
  //       }
  //     }
  //     console.log(errorss);
  //     window.alert(errorss);
  //   });
  // }

  // onFileSelected(event){
  //   this.selectedImage = event.target.files;
   
  // }
}

