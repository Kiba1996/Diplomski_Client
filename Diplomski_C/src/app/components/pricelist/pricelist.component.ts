import { Component, OnInit } from '@angular/core';
import { PricelistServiceService } from 'src/app/services/priceListService/pricelist.service';
import { TicketPricesPomModel } from 'src/app/model/ticketPricesPomModel';
import { PriceListModel } from 'src/app/model/pricelistModel';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {
  priceList: any;
  ticketPricesPom: TicketPricesPomModel = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []));
  datumVazenjaBool: boolean = false;
  validPrices: TicketPricesPomModel;
  pocDatum: string = "";
  endDatum: string = "";
    constructor( private pricelistServ: PricelistServiceService) { 
      this.pricelistServ.getPricelist().subscribe(data => {
        
        this.priceList = data; 
         console.log(data);
        
         this.validPrices = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []))
         if(this.priceList){
           let d : Date = new Date(this.priceList.startOfValidity);
           this.pocDatum = d.getDate().toString()+ "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString() + ".";
           let e: Date = new Date(this.priceList.endOfValidity);
           this.endDatum = e.getDate().toString() + "." + (e.getMonth() + 1).toString() + "." + e.getFullYear().toString() + ".";
       
           let ticketPrices: any[] = [];
           this.pricelistServ.getTicketPrices(this.priceList._id).subscribe(data =>{
              ticketPrices = data;
              console.log(data);
              this.validPrices.Hourly = ticketPrices[0].price;
              this.validPrices.Daily = ticketPrices[1].price;
              this.validPrices.Monthly = ticketPrices[2].price;
              this.validPrices.Yearly = ticketPrices[3].price;
           });
  

           //  this.priceList.TicketPricess.forEach(element => {
        //   if(element.TicketTypeId == 2)
        //   {
        //     this.validPrices.Daily = element.Price;
        //   }
        //   if(element.TicketTypeId == 1)
        //   {
        //     this.validPrices.Hourly = element.Price;
        //   }
        //   if(element.TicketTypeId == 3)
        //   {
        //     this.validPrices.Monthly = element.Price;
        //   }
        //   if(element.TicketTypeId == 4)
        //   {
        //     this.validPrices.Yearly = element.Price;
        //   }
          
        // });
      }
      });
       
    }

  ngOnInit() {
  }

}
