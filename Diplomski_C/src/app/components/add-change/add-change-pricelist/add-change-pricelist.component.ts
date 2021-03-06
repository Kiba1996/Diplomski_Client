import { Component, OnInit } from '@angular/core';
import { PricelistServiceService } from 'src/app/services/priceListService/pricelist.service';
import { PriceListModel } from 'src/app/model/pricelistModel';
import { NgForm } from '@angular/forms';
import { TicketPricesPomModel } from 'src/app/model/ticketPricesPomModel';
import { TicketPricessModel } from 'src/app/model/ticketPriceModel';

@Component({
  selector: 'app-add-change-pricelist',
  templateUrl: './add-change-pricelist.component.html',
  styleUrls: ['./add-change-pricelist.component.css']
})
export class AddChangePricelistComponent implements OnInit {
priceList: any;
ticketPricesPom: TicketPricesPomModel = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(null,null,0, []));
datumVazenjaBool: boolean = false;
validPrices: TicketPricesPomModel;
pocDatum: string = "";
endDatum: string = "";

  constructor( private pricelistServ: PricelistServiceService) { 
    this.refresh();
     
  }

  ngOnInit() {
  }

  onSubmit(pm: PriceListModel, form: NgForm){
  let priceL : any;
  let bol : boolean = false;
  this.ticketPricesPom.PriceList = pm;

    this.pricelistServ.addPricelist(this.ticketPricesPom).subscribe(data =>
      {
        window.alert("Pricelist successfully added!");
        this.refresh();
      },
      err => {
        window.alert(err.error.message);
        
        this.refresh();
      });

  }
  onSubmit1(pm: TicketPricesPomModel, form: NgForm){
    if(pm.Hourly == null)
    {
      pm.Hourly = 0;
    }
    if(pm.Daily == null)
    {
      pm.Daily = 0;
    }
    if(pm.Monthly == null)
    {
      pm.Monthly = 0;
    }
    if(pm.Yearly == null)
    {
      pm.Yearly = 0;
    }
    this.ticketPricesPom = pm;
    
    this.datumVazenjaBool = true;
  }
  refresh(){
    this.ticketPricesPom  = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(null,null,0, []));
     this. datumVazenjaBool = false;
     this.validPrices = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(null,null,0, []))
   
    this.pricelistServ.getPricelist().subscribe(data => {
      
      this.priceList = data; 
      if(this.priceList)
      {
        console.log(data);
        let d : Date = new Date(this.priceList.startOfValidity);
        this.pocDatum = d.getDate().toString()+ "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString() + ".";
        let e: Date = new Date(this.priceList.endOfValidity);
        this.endDatum = e.getDate().toString() + "." + (e.getMonth() + 1).toString() + "." + e.getFullYear().toString() + ".";
        this.validPrices = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(null,null,0, []))
      }
       
       if(this.priceList){
         let ticketPrices: any[] = [];
         this.pricelistServ.getTicketPrices(this.priceList._id).subscribe(data =>{
            ticketPrices = data;
            console.log(data);
            this.validPrices.Hourly = ticketPrices[0].price;
            this.validPrices.Daily = ticketPrices[1].price;
            this.validPrices.Monthly = ticketPrices[2].price;
            this.validPrices.Yearly = ticketPrices[3].price;
         });

    }
    else {
      this.validPrices = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(null,null,0, []));
    }

     },
     err=>{
        
     });
  }

}
