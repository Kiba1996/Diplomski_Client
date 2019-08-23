export class TicketPricessModel{
    Id: number;
    Price: number;
    DayTypeId: number;
    
    
    
    constructor( id: number, price:number , dtid: null ){
        this.Id = id;
        this.Price = price;
        this.DayTypeId = dtid;
      
    }
}