import { TicketPricessModel } from './ticketPriceModel';

export class PriceListModel{
    Id: number;
    StartOfValidity: Date;
    EndOfValidity: Date;
    TicketPricess: TicketPricessModel[];
    
    
    
    constructor( Start: Date, End: Date,id: number, tp: TicketPricessModel[] ){
        this.Id = id;
        this.EndOfValidity = End;
        this.StartOfValidity = Start;
        this.TicketPricess= tp;
      
    }
}