import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticketService/ticket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-ticket-validation',
  templateUrl: './ticket-validation.component.html',
  styleUrls: ['./ticket-validation.component.css']
})
export class TicketValidationComponent implements OnInit {

  ticketForV : any;
  ticketExists: string = "";
  ticketMessage: string = "";
  ticketMessageError: string = "";
  ticketRet: any;
  allTT: any ;
  myInput1: string = "";
  myInput : number ;
  user : any;
  prom : string = "PENDING";
  constructor(private ticketServ: TicketService, private auth: AuthenticationService) {
    this.auth.profile().subscribe(data => {

      this.user = data;    
      this.prom = this.user.activated;

    });
   }

  ngOnInit() {
  }

  FindTicket(n:any){
 
    this.ticketMessage = "";
    this.ticketMessageError= "";
    this.myInput1 = "";
    console.log(n);
    if(n != null)
    {
      this.ticketServ.getTicket(n).subscribe(data => {
        this.ticketForV = data;
        
        if(this.ticketForV)
        {
            this.ticketExists = "";
            this.myInput1 = "";
            if(this.ticketForV.user == "" || this.ticketForV.user == undefined || this.ticketForV.user == null)
            {
              this.ticketServ.validateTicketNoUser(this.ticketForV).subscribe(data =>{
                this.myInput1 = "";
                this.myInput = null;
                this.ticketForV = null;
                this.ticketMessage = data.message;
              },
              err =>
              {
                this.myInput1 = "";
                this.myInput = null;
                this.ticketForV = null;
                this.ticketMessageError = err.error.message;
              })
            }
  
        }
      },
      err =>
      {
        this.myInput1 = "";
        this.myInput = null;
        this.ticketForV = null;
        this.ticketExists = err.error.message;
      });
    }
    
    
  }

  
ValidateTicket(n:any)
{
  this.ticketMessage = "";
  this.ticketMessageError= "";
  

  this.ticketServ.validateTicket(n,this.ticketForV).subscribe(data =>
    {
      
      this.myInput1 = "";
      this.myInput = null;
      this.ticketForV = null;
      this.ticketRet = data;
      if(data.message == "Ticket is valid.")
      {
        this.ticketMessage = data.message;
      }else
      {
        this.ticketMessageError = data.message;
      }
      
    },
    err =>
    {
      this.myInput1 = "";
      this.myInput = null;
      this.ticketForV = null;
      this.ticketMessageError = err.error.message;
    })
}
  
}
