import { Component, OnInit, NgZone, Output,Directive ,EventEmitter,Input, OnChanges,SimpleChanges} from '@angular/core';
import { Polyline } from 'src/app/model/map/polyliner';
import { GeoLocation } from 'src/app/model/map/geolocation';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { StationService } from 'src/app/services/stations/station.service';
import { MarkerInfo } from 'src/app/model/map/marker-info.model';
import { StationModel } from 'src/app/model/stationModel';
import { NgForm } from '@angular/forms';
import { LineModel } from 'src/app/model/lineModel';
import { LineServiceService } from 'src/app/services/lines/line.service';
import { element } from 'protractor';


@Component({
  selector: 'app-add-change-lines',
  templateUrl: './add-change-lines.component.html',
  styleUrls: ['./add-change-lines.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class AddChangeLinesComponent implements OnInit {

  directionsService :any ;
  directionsDisplay : any ;
  public polyline: Polyline;
  sl: LineModel = new LineModel(0,"",[],"","",0);
  selektovanaLinijaZaIzmenu: any;
  selLine: Polyline;
  id: String; 
  idForRemove: number;
  selectedL: string = "none";
  selected: string = "";
  public zoom: number;
  stati: any = [];
  drugiMarkeriStati: any = [];
  markerInfo: MarkerInfo;
  pomStat: StationModel;
  allLines: any = [];
  selectedStations: StationModel[] = [];
  public latitude: number;
  public longitude: number;
  markerZaDodavanje: StationModel;
  boolic: boolean = false;
  boolZaAktivanRadio = true;
  boolZaMarkerZaDodavanje : boolean = false;
  LineSelected : string = "none";
  visibleLine : boolean = true;
  linesWihtStations : LineModel[] = [];
  iconPath : any = { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}}

  errorForListStat:string = "";
  
  constructor(private ngZone: NgZone, private mapsApiLoader : MapsAPILoader , private statServ: StationService, private lineServ: LineServiceService) { 
    this.setradio("Add");
    
    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;
      this.drugiMarkeriStati = data;
      console.log("stanice: ",data);
      });

      this.lineServ.getAllLines().subscribe(data => {
        this.allLines = data;
        this.linesWihtStations = [];
        let lin = new LineModel(0,"",[],"","",0)
        this.allLines.forEach(element => {

         
          lin.ColorLine = element.colorLine;
          lin.LineNumber = element.lineNumber;
          lin.Id = element._id;
          
          lin.Stations = this.findStations(element.stations);
          lin.Version = element.__v;
          this.linesWihtStations.push(lin);
          lin =  new LineModel(0,"",[],"","",0)
        });
        
        console.log("data: ",data);
        console.log("findStations: ", this.linesWihtStations)
      });
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});


    this.mapsApiLoader.load().then(() =>{
      google.maps.event.addListener(this.sl, 'positionChanged', (function(selLine, i) {
        return function(event) {
          console.log(event.LatLngLiteral);
          alert("WTF");
        }
      }));
      this.directionsService  = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    });
    
  }

  findStations(e: any[]): StationModel[]{
    let ret: StationModel[] = []
    e.forEach(elem =>{
     ret.push( this.stati.find(x => x._id == elem));
    });
    return ret;
  }

  stationClick( id: String){  //pravjenje linije
    this.pomStat = new StationModel("","",0,0,0);
    let postojiStanica : boolean = false;
    if(this.selected == 'Add'){
      this.stati.forEach(element => {
       if(element._id == id){
         this.pomStat.Id = element._id;
          this.pomStat.Address = element.address;
          this.pomStat.Name = element.name;
          this.pomStat.Latitude = element.latitude;
          this.pomStat.Longitude = element.longitude;
       }
    });
    this.selectedStations.forEach(element => {
      if(element.Id == this.pomStat.Id)
      {
        postojiStanica = true;
      }
    })
    if(postojiStanica)
    {
      window.alert("Station already exists in line! Choose another station.");
    }else {
      this.selectedStations.push(this.pomStat);
      this.polyline.addLocation(new GeoLocation(this.pomStat.Latitude, this.pomStat.Longitude))
      this.id = id;
    }
    
    }
  }

  SelectedLine(event: any): void
  {
    this.selectedL = event.target.value;
    this.visibleLine = false;
    if(this.selectedL == "none" || this.selectedL == "")
    {
      this.sl = new LineModel(0,"",[],"");
      this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
      this.selektovanaLinijaZaIzmenu = new LineModel(0,"",[],"","",0);
      this.idForRemove = 0;
      this.directionsDisplay.setMap(null);
    }
    else 
    {
      this.directionsDisplay.setMap(null);
      this.visibleLine = false;
      this.selektovanaLinijaZaIzmenu = new LineModel(0,"",[],"","",0);
      this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
      this.linesWihtStations.forEach(x => {
        if(x.LineNumber == this.selectedL)
        {
          this.selektovanaLinijaZaIzmenu = x;
          this.sl = x;
          this.idForRemove = x.Id;
          x.Stations.forEach(stat => {
            this.selLine.addLocation(new GeoLocation(stat.Longitude, stat.Latitude));
          });
          this.visibleLine= true;
        }
      });

    }
  }

  isSelectedLine(name: string): boolean
  {
    if (!this.selectedL) { 
      return false;  
    }  
    return (this.selectedL === name); 
  }

  setradio(e: string): void   
  {  
    this.visibleLine = false;
    this.selektovanaLinijaZaIzmenu =  new LineModel(0,"",[],"","",0);
    this.sl =  new LineModel(0,"",[],"","",0);
    this.LineSelected = "none";
    this.refresh();
        this.selected = e;  
        if(this.selected != "Add")
        {
          this.boolZaAktivanRadio = false;
        }
       
  }  

  isSelected(name: string): boolean   
  {  
    if (!this.selected) {  
       return false;  
    }  
    return (this.selected === name);  
  } 

  onSubmit(lineData: LineModel, form: NgForm){
    
      if(this.selected == "Add")
      {
        lineData.Stations = this.selectedStations;
        if(lineData.ColorLine == "" || lineData.ColorLine == null)
        {
          lineData.ColorLine = "#000000";
        }

        this.lineServ.addLine(lineData).subscribe(data => {
          this.boolic = data;
          window.alert("Line successfully added!");
          form.reset();
          this.refresh();
        },
        err => {
          window.alert(err.error.message);
          form.reset();
          this.refresh();
        });
        
      }
      else if(this.selected == "Change"){
        if(this.selectedL != "none")
    {
       
        lineData.Stations = this.selektovanaLinijaZaIzmenu.Stations;
        lineData.Id = this.selektovanaLinijaZaIzmenu.Id;
        lineData.ColorLine = this.selektovanaLinijaZaIzmenu.ColorLine;
        lineData.LineNumber = this.selektovanaLinijaZaIzmenu.LineNumber;
        lineData.Version = this.selektovanaLinijaZaIzmenu.Version;
        console.log(lineData);
        this.lineServ.changeLine(lineData,this.selektovanaLinijaZaIzmenu.Id.toString()).subscribe(data =>
          {
            window.alert("Line successfully changed!");
            this.LineSelected = "none";
            form.reset();
            this.refresh();
            
          },
        err => {
          window.alert(err.error.message);
          this.refresh();
        });
        }
      }
      else if(this.selected == "Remove"){
        if(this.idForRemove == undefined)
        {
          this.idForRemove = 0;
        }
        this.lineServ.deleteLine(this.idForRemove.toString()).subscribe(data =>
          {
            window.alert("Line successfully removed!");
            form.reset();
            this.refresh();
          },
          err => {
            window.alert(err.error.message);
            this.refresh();
          });
       
      }
      else{
      }
    
   
  }

  removeFromLine(stationId,i)
  {
    this.selektovanaLinijaZaIzmenu.Stations.splice(i,1);
    console.log("Stanice izbacene: ",this.selektovanaLinijaZaIzmenu.Stations)
  }

  addStationIntoLine(i: any, form: NgForm)
  {
    let postojiStanica : boolean = false;

    this.selektovanaLinijaZaIzmenu.Stations.forEach(element => {
      if(element._id == this.markerZaDodavanje.Id)
      {
        postojiStanica = true;
      }
    })
    if(postojiStanica)
    {
      window.alert("Station already exists in line! Choose another station.");
    }else {
       
      if(i.rBr <= 0 || i.rBr > this.selektovanaLinijaZaIzmenu.Stations.length + 1)
      {
        window.alert("Index out of range!");
        form.reset();
      }
      else
      {
        this.errorForListStat = "";
        this.selektovanaLinijaZaIzmenu.Stations.splice(i.rBr-1,0,this.markerZaDodavanje);
        this.boolZaMarkerZaDodavanje = false;
      }
    }
   
    
  }

  stationClick1( id: number){

    this.stati.forEach(element => {
       if(element._id == id){
         this.markerZaDodavanje = element;
         this.boolZaMarkerZaDodavanje = true;
       }
 
    });
    
  }

  refresh()
  {
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.sl =  new LineModel(0,"",[],"","",0);
    this.selektovanaLinijaZaIzmenu =  new LineModel(0,"",[],"","",0);
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.selectedL = "none";
    this.markerZaDodavanje = new StationModel("","", 0,0,0);
    this.allLines = [];
    this.selectedStations = [];
    this.boolZaMarkerZaDodavanje = false;
    this.idForRemove = 0;
    this.LineSelected = "none";
    
    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;
      this.drugiMarkeriStati = data;
    });

    this.lineServ.getAllLines().subscribe(data => {
      this.allLines = data;
      this.linesWihtStations = [];
      let lin =  new LineModel(0,"",[],"","",0);
      this.allLines.forEach(element => {

       
        lin.ColorLine = element.colorLine;
        lin.LineNumber = element.lineNumber;
        lin.Id = element._id;
        lin.Stations = this.findStations(element.stations);
        lin.Version = element.__v;
        this.linesWihtStations.push(lin);
        lin =  new LineModel(0,"",[],"","",0);
      });
      
      console.log("data: ",data);
      console.log("findStations: ", this.linesWihtStations)
      
    });
    
  }
  
}
