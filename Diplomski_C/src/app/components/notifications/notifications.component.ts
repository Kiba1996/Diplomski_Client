import { Component, OnInit } from '@angular/core';
import { VerificationService } from 'src/app/services/verification/verification.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  user: any;
  awaitingAdmins:any = [];
  awaitingControllers:any = [];
  //modelHelp: ModelHelperAuthorization = new ModelHelperAuthorization("");
  awaitingClients:any = [];
  awaitingRegularClients: any = [];

  userBytesImages:any = [];
  imagesLoaded:boolean = false
  wtfList:any = []

  //, private notificationServ: NotificationService
  constructor(private verifyService: VerificationService,private auth: AuthenticationService) { 
    this.auth.profile().subscribe(data => {

      this.user = data;       
     if(this.user.role == 'Admin')
     {
      verifyService.getAwaitingAdmins().subscribe(data => {
        this.awaitingAdmins = data;
        verifyService.getAwaitingControllers().subscribe(data => {
          this.awaitingControllers = data;
        });
      })
    }
    if(this.user.role == 'Controller'){

      if(this.user.activated == 'ACTIVATED'){
      verifyService.getAwaitingClients().subscribe(data => {
        this.awaitingClients = data;


        this.awaitingClients.forEach(element => {
          var c = "data:image/png;base64," +  this.arrayBufferToBase64(element.image.data.data);
          this.wtfList.push(c)
        });
          this.imagesLoaded = true
          console.log(this.userBytesImages)

      })
      }
    }
    });



  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

  ngOnInit() {
  }


  AuthorizeAdmins(id, i) {
    //this.modelHelp.Id = id;
    let fd = new FormData();
    fd.append('id', id);
    this.verifyService.authorizeAdmin(fd).subscribe(resp => {
      if(resp.message == "Ok")  {
        alert("Admin has been authorized!");
        this.awaitingAdmins.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }

  DeclineAdmins(id,i)
  {
   // this.modelHelp.Id = id;
   let fd = new FormData();
    fd.append('id', id);
    this.verifyService.declineAdmin(fd).subscribe(resp => {
      if(resp.message == "Ok")  {
        alert("Admin has been declined!");
        this.awaitingAdmins.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }

  AuthorizeControllers(id, i) {
    //this.modelHelp.Id = id;
    let fd = new FormData();
    fd.append('id', id);
    this.verifyService.authorizeController(fd).subscribe(resp => {
      if(resp.message == "Ok")  {
        alert("Controller has been authorized!");
        this.awaitingControllers.splice(i,1);
      }

      else alert("Something went wrong");
    })


  }

  DeclineControllers(id,i)
  {
    //this.modelHelp.Id = id;
    let fd = new FormData();
    fd.append('id', id);
    this.verifyService.declineController(fd).subscribe(resp => {
      if(resp.message == "Ok")  {
        alert("Controller has been declined!");
        this.awaitingControllers.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }

  AuthorizeUser(id, i) {
    //this.modelHelp.Id = id;
    let fd = new FormData();
    fd.append('id', id);
    this.verifyService.authorizeUser(fd).subscribe(resp => {
      if(resp.message == "Ok")  {
        alert("Client has been authorized!"); 
        this.awaitingClients.splice(i,1);
        this.wtfList.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }

  DeclineUser(id, i) {
   // this.modelHelp.Id = id;
   let fd = new FormData();
    fd.append('id', id);
    this.verifyService.declineUser(fd).subscribe(resp => {
      if(resp.message == "Ok")  {
        alert("Client has been declined!"); 
        this.awaitingClients.splice(i,1);
        this.wtfList.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }


}