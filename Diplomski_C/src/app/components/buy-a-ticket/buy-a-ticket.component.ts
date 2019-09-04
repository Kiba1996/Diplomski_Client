import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticketService/ticket.service';
import { PricelistServiceService } from 'src/app/services/priceListService/pricelist.service';

import { PriceListModel } from 'src/app/model/pricelistModel';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { NgForm } from '@angular/forms';
//import { PayPalConfig } from 'ngx-paypal'
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { ShowTicketsComponent } from '../show-tickets/show-tickets.component';
@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  allTicketTypes : any = [];
  ticketTypeDetail: string = "";
  selecetTT : number;
  priceList: any;
  dobavljanjePayPal: any;
  price: number;
  discount: number;
  priceWDiscount: number;
  user: any;
  neregKupVremKartu : boolean= false;
  poruka: string = "";
  prikaziButtonK : boolean = false;
   typeM : any;
   EmailForPay : string = "";
   validan : any;
   korisceniEmail: string = "";
   boolZaOtvaranjeForme: boolean = false;
   mailZaSlanje: string = "";
   boolZaPrikazCena: boolean = false;
   skloniFormu: boolean = false;

  constructor(private router: Router,private ticketServ: TicketService, 
    private pricelistServ: PricelistServiceService, private usersService: AuthenticationService) {

    ticketServ.getAllTicketTypes().subscribe( data => {
      this.allTicketTypes = data;
      console.log("ticket types: ",data);
      this.pricelistServ.getPricelist().subscribe(data => {
        this.priceList = data; 
        this.priceList.TicketPricess = [];
        if(this.priceList){
          this.pricelistServ.getTicketPrices(this.priceList._id).subscribe(data=>{
            data.forEach(element => {
              this.priceList.TicketPricess.push(element);
            });
          })
           console.log(data);
        }

         let ro = localStorage.getItem('role');
         if(ro)
         {
           if(ro == "AppUser")
           {
            this.user = this.usersService.getUserDetails();
            console.log(this.user); 
           }
         }else {
           this.neregKupVremKartu = true;
         }


      },err =>{
        window.alert(err.error.message)
        console.log(err);
      });
    });
    

   }

  ngOnInit() {
    
  }

setradio(sel)
{
  this.boolZaPrikazCena = false;
  this.boolZaOtvaranjeForme = false;
  this.mailZaSlanje = "";
  if(sel != 0)
  {
    this.selecetTT = sel;
    let bla = new FormData();
    bla.append("email",localStorage.getItem('name') );
    bla.append("ticketType",sel);
    this.ticketServ.checkValidity(bla).subscribe(data =>{
      this.validan = data;
      console.log(data);
      if(this.validan)
        {
          this.priceList.TicketPricess.forEach(element => {
           this.allTicketTypes.forEach(el => {
             if(sel == 1 && el._id == element.ticketType && el.name == "Hourly" ){
              this.price = element.price;
             }
             if(sel == 2 && el._id == element.ticketType && el.name == "Daily" ){
              this.price = element.price;
             }
             if(sel == 3 && el._id == element.ticketType && el.name == "Monthly" ){
              this.price = element.price;
             }
             if(sel == 4 && el._id == element.ticketType && el.name == "Yearly" ){
              this.price = element.price;
             }
           });
           
          });

          if(!this.neregKupVremKartu)
          {
              this.CalculateDiscount();
            
          }else{
            
            this.discount = 0;
            this.priceWDiscount = this.price;
           this.boolZaOtvaranjeForme = true;
           this.boolZaPrikazCena = true;
          }
        }else{
          window.alert("You are not authorized for this purchase!");
          this.price = 0;
          this.priceWDiscount = 0;
          this.discount = 0;
        }
      })
  }
}


  CalculateDiscount(){
    let uN =  localStorage.getItem('name');
    
    this.ticketServ.getTypeUser(uN).subscribe(data =>{
      this.typeM = data;
      this.discount =  this.typeM.coefficient * 100;
      this.priceWDiscount = this.price - (this.price * this.typeM.coefficient) ;
      this.boolZaPrikazCena = true;
     this.initConfig();
    });
  }

  UpisiKartu(neregistrovani: boolean) {

    let payPalMod = new FormData();
    payPalMod.append("payementId", this.dobavljanjePayPal.id);
    let pom = new Date(this.dobavljanjePayPal.create_time);
    pom.setHours(pom.getHours() + 2);
    payPalMod.append("createTime", pom.toString());
    payPalMod.append("payerEmail", this.dobavljanjePayPal.payer.email_address);
    payPalMod.append("payerName", this.dobavljanjePayPal.payer.name.given_name);
    payPalMod.append("payerSurname", this.dobavljanjePayPal.payer.name.surname);
    payPalMod.append("currencyCode", this.dobavljanjePayPal.purchase_units[0].amount.currency_code);
    payPalMod.append("value",  this.dobavljanjePayPal.purchase_units[0].amount.value);

    console.log("PayPal model: ", payPalMod);

    let b = new Date();
    b.setHours(b.getHours()+ 2);
    payPalMod.append("purchaseTime", new Date(b).toString());
    let ticketType;
    this.allTicketTypes.forEach(element => {
      if(element.name == "Hourly" && this.selecetTT == 1){
        ticketType = element._id;
      }
      if(element.name == "Daily" && this.selecetTT == 2){
        ticketType = element._id;
      }
      if(element.name == "Monthly" && this.selecetTT == 3){
        ticketType = element._id;
      }
      if(element.name == "Yearly" && this.selecetTT == 4){
        ticketType = element._id;
      }
    });
    payPalMod.append("ticketType", ticketType);
    this.priceList.TicketPricess.forEach(element => {
      if(element.ticketType == ticketType)
      {
        payPalMod.append("ticketPrices", element._id);
      }
    });
    
    if(neregistrovani){
      if(this.mailZaSlanje != "" && this.mailZaSlanje != undefined && this.mailZaSlanje != null)
      {
        payPalMod.append("name", this.mailZaSlanje);
      }else
      {
          payPalMod.append("name", this.korisceniEmail);
      }
    }
    else{
      payPalMod.append('user', this.user._id);
    }
    
   
    this.ticketServ.addPayPal(payPalMod).subscribe(data => {
    
        window.alert("Ticket successfully bought!")
 
    },
    err =>{
      window.alert(err.error)
      console.log(err);
    });

  }

  submitEmail(t:any, form:NgForm){
    if(t.Email != "" && t.Email != undefined && t.Email != null){
        
      this.mailZaSlanje = t.Email;
      
      this.initConfig();
    }
    form.reset();
  }

  private initConfig(): void {
    var diffDays =this.priceWDiscount;
    console.log("cena u dinarima: ", diffDays);
    diffDays = diffDays/118;
    var str = diffDays.toFixed(2);
    console.log("cena u evrima: ", str);

    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: str,
                  breakdown: {
                      item_total: {
                          currency_code: 'EUR',
                          value: str
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'EUR',
                      value: str,
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'horizontal',
          size:  'medium',
          shape: 'pill',
          color:  'blue'  
      },
      
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', 
          data, actions);
      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your' + 
          'server about completed transaction at this point');
          console.log("paypal data: ", data);
          this.dobavljanjePayPal = data;
          if(this.neregKupVremKartu)
          {
            this.korisceniEmail  = data.payer.email_address;
            this.UpisiKartu(true);
          }
          else{
            this.UpisiKartu(false);
          }
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
      },
      onError: err => {
          window.alert("Something went wrong!");
          console.log('OnError', err);
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
      }
  };
}


}
