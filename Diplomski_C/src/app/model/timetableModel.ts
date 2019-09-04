import { VehicleModel } from './vehicleModel';

export class TimetableModel{
    Id: string;
    Departures: string;
    
    LineId: string;
    DayTypeId: string;
    Vehicles: VehicleModel[];
    Version : number;
    constructor( name: string, lId: string,dId: string,id: string,v?: number ){
        this.Id = id;
        this.Departures = name;
       
        this.LineId = lId;
        this.DayTypeId = dId;
        this.Vehicles = [];
        this.Version = v;
    }
}