import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { BusLocationService } from 'src/app/services/busLocation/bus-location.service';
import { Subscription } from 'rxjs';
import { StationModel } from 'src/app/model/stationModel';
import { Polyline } from 'src/app/model/map/polyliner';
import { MarkerInfo } from 'src/app/model/map/marker-info.model';
import { GeoLocation } from 'src/app/model/map/geolocation';
import { LineServiceService } from 'src/app/services/lines/line.service';
import { StationService } from 'src/app/services/stations/station.service';
@Component({
  selector: 'app-bus-location',
  templateUrl: './bus-location.component.html',
  styleUrls: ['./bus-location.component.css'],
  styles: ['agm-map {height: 500px; width: 750px;}']
})
export class BusLocationComponent implements OnInit, OnDestroy {
  currentNumber: number;
  currNmr: any;
  sub: Subscription;

  public polyline: Polyline;
  public polylineRT: Polyline;  
  public zoom: number = 15;
  startLat : number = 45.242268;
  startLon : number = 19.842954;
  stati: any = [];
  options : string[];
  options1: any;
  stations : any = [];
  buses : any[];
  busImgIcon : any = {url:"assets/busicon.png", scaledSize: {width: 50, height: 50}};
  autobusImgIcon : any = {url:"assets/autobus.png", scaledSize: {width: 50, height: 50}};

  isConnected: boolean;
  notifications: string[];
  time: number[] = [];

  latitude : number ;
  longitude : number;
  marker: MarkerInfo = new MarkerInfo(new GeoLocation(this.startLat,this.startLon),"","","","");

  isChanged : boolean = false;


  constructor(public busLoc: BusLocationService,public lineService: LineServiceService, public statServ: StationService, private ngZone: NgZone) { }

  ngOnInit() {
    this.sub = new Subscription();
    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;

      });

    this.lineService.getAllLines().subscribe(
      data =>{
        this.options = [];
        this.options1 = data;
        this.options1.forEach(element => {
          this.options.push(element.lineNumber);
        });

      });
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});

    this.stations = [];




  }

  findStations(e : any[]) : StationModel[]
  {
    let ret :StationModel[] = [];
      e.forEach(element => {
       ret.push(this.stati.find(x => x._id == element));
      });

    return ret;
  }


  getStationsByLineNumber(lineNumber : string){
    this.options1.forEach(element => {
      if(element.lineNumber == lineNumber)
      {
        this.stations = this.findStations(element.stations);
        console.log("findStations", this.stations);
        for(var i=0; i<this.stations.length; ++i){
          this.polyline.addLocation(new GeoLocation(this.stations[i].latitude, this.stations[i].longitude));
        }
        console.log(this.stations);

        this.busLoc.sendStations(this.stations);
        this.busLoc.readyToReceive();
        this.sub = this.busLoc.getMessages().subscribe(q => {
          this.ngZone.run(() => { 
            this.currentNumber = q;
            this.currNmr = q;

            this.latitude = q[1];
            this.longitude = q[0];
            console.log("pos: ", this.latitude, this.longitude);

          });
        });
      }
    });

  }

  onSelectionChangeNumber(event){
    this.isChanged = true;
    this.stations = [];
    this.polyline.path = [];
    if(event.target.value == "")
    {
      this.isChanged = false;
      this.stations = [];
      this.polyline.path = [];
    }else
    {
      this.getStationsByLineNumber(event.target.value);   

    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}