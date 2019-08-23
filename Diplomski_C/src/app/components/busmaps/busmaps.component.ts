import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { StationService } from 'src/app/services/stations/station.service';
import { LineServiceService } from 'src/app/services/lines/line.service';
import { Router } from '@angular/router';
import { MarkerInfo } from 'src/app/model/map/marker-info.model';
import { Polyline } from 'src/app/model/map/polyliner';
import { LineModel } from 'src/app/model/lineModel';
import { GeoLocation } from 'src/app/model/map/geolocation';
import { StationModel } from 'src/app/model/stationModel';

@Component({
  selector: 'app-busmaps',
  templateUrl: './busmaps.component.html',
  styleUrls: ['./busmaps.component.css'],
  styles: ['agm-map {height: 500px; width: 750px;}']
})
export class BusmapsComponent implements OnInit {

  directionsService :any ;
  directionsDisplay : any ;
  stati: any = [];
  allLines: any = [];
  showLines: any =[];
  selectedL: string = "";
  sl: LineModel = new LineModel(0,"",[],"");
  k: boolean[];
  colorLines: string[] = [];
  selLine: Polyline;
  myGroup: FormGroup;
  show: boolean = false;
  markerInfo: MarkerInfo;
  linesWStations: any = [];
  iconPath : any = { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}}
  constructor(private ngZone: NgZone, private formBuilder: FormBuilder, private mapsApiLoader : MapsAPILoader , private statServ: StationService, private lineServ: LineServiceService, private router: Router) { 

    this.statServ.getAllStations().subscribe(data => {
      this.stati = data;
      console.log(data);

        this.lineServ.getAllLines().subscribe(data => {
          this.allLines = data;
          console.log(data);


          this.linesWStations = [];
          let lineses = new LineModel(0,"",[],"");
          this.allLines.forEach(element => {
          lineses.ColorLine = element.colorLine;
          lineses.LineNumber= element.lineNumber;
          lineses.Id = element._id;
          lineses.Stations = this.findStations(element.stations);
          this.linesWStations.push(lineses);
          lineses = new LineModel(0,"",[],"");
        });
        console.log("data" , data);
        console.log("linsWStations", this.linesWStations);

        this.showCheckBoxes();
      });




    });

  }
  findStations(e : any[]) : StationModel[]
  {
    let ret :StationModel[] = [];
    //let statPom : StationModel = new StationModel()
      e.forEach(element => {
       ret.push(this.stati.find(x => x._id == element));
      });

    return ret;
  }
  getLocation(){
    this.router.navigateByUrl('/getLocation');
  }

  FieldsChange(event){
    let ln = event.currentTarget.checked;
    console.log(ln);
    console.log(event.currentTarget.value);
    let lNum = event.currentTarget.value;
    if(ln)
    {
      this.AddLineToShowLines(lNum);
      console.log(this.showLines);
    }
    else{
      this.RemoveLineFromShowLines(lNum);
      console.log(this.showLines);
    }

  }

  AddLineToShowLines(lNum: string)
  {
    this.linesWStations.forEach(element => {
      if(element.LineNumber == lNum)
      {
        this.showLines.push(element);
        console.log(element)
      }

    });
    console.log("showLines", this.showLines);
  }

  AddLineToShowLines1(lNum: string)
  {

  }

  RemoveLineFromShowLines(lNum: string)
  {
    let a : LineModel;

    this.linesWStations.forEach(element => {
      if(element.LineNumber == lNum)
      {
        a = element;
      }
    });
    const index : number = this.showLines.indexOf(a);
    this.showLines.splice(index,1);
  }

  private addCheckBoxes(){
    this.linesWStations.map((o,i)=> {
      const control = new FormControl(false);
      (this.myGroup.controls.linesWStations as FormArray).push(control);
    });
    console.log("Metoda add checkBoxes");
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});


  }

  showCheckBoxes(){
    console.log("sssss");
    this.myGroup = this.formBuilder.group({
      linesWStations: new FormArray([]) //new FormArray(formControls)
    });

    this.addCheckBoxes();
    this.show = true;
  }



}

