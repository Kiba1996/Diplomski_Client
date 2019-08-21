import { StationModel } from './stationModel';

export class LineModel{
    Id: number;
    LineNumber: string;
    ColorLine: string;
    Stations: StationModel[] = [];
    _id: String;
    Version: number;
    
    
    constructor( id: number,  linenumber:string,stations: StationModel[], col:string,i?:String, ver? : number ){
        this.Id = id;
        this.LineNumber = linenumber;
        this.Stations = stations;
        this.ColorLine = col;
        this._id = i;
        this.Version = ver;
      
    }
}