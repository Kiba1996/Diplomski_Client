import { Component, OnInit } from '@angular/core';
import { LineServiceService } from 'src/app/services/lines/line.service';
import { TimetableService } from 'src/app/services/timetable/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  allLines: any = [];
  allTimetables: any = [];
  showList: any = [];
  dt: any;
  dt1: number;
  selectedDay : boolean  = false;
  lineIdChoosen: string;
  boolic: boolean = false;
  stringovi1 : string[] = [];
  SelectL: string = "None";
  boolZaOtvaranje: boolean = false;
  dayTypes : any = [];
  constructor(private lineServ: LineServiceService, private timetableServ: TimetableService) { 
    this.lineServ.getAllLines().subscribe(data => {
      this.allLines = data;
      console.log(data);

      this.timetableServ.getAllTimetables().subscribe(data => {
        this.allTimetables = data;
        console.log(data);
        this.setradio(0);

        this.boolZaOtvaranje = true;
        this.timetableServ.getAllDayTypes().subscribe(data =>{
          this.dayTypes = data;
          console.log("daytypes:  ", data);
        })
      });

    });    
  }

  ngOnInit() {
  }

  setradio(selected): void
  {
    console.log(selected);
    this.boolic= false;
    this.lineIdChoosen = "";
    this.SelectL = "None";
   
    this.dt1 = selected;
    if(this.dt1 == 0)
    {
      this.selectedDay = false;
    }else {
      this.selectedDay = true;
      
     
        this.dayTypes.forEach(element => {
          if(element.name == "WorkDay" && this.dt1==1){
            this.dt = element._id;
          }
          if(element.name == "Saturday" && this.dt1==2){
            this.dt = element._id;
          }
          if(element.name == "Sunday" && this.dt1==3){
            this.dt = element._id;
          }

        });
        this.GetLineIds();
      }
    
  }

  

  GetLineIds()
  {

    let ll: any =[];
    let k : boolean = false;
    this.showList = [];
    if(this.allTimetables === void 0){
  
      this.showList = [];
    }
    else{
     
      this.allTimetables.forEach(element => {
       
        if(element.dayType == this.dt)
        {
          ll.push(element);
        }
      });
  
      if(ll === void 0 || ll == [])
      {
        this.showList = [];
      }
      else {
        this.allLines.forEach(element => {
          k = false;
          ll.forEach(d => {
            if(d.line == element._id)
            {
              k = true;
            }
          });
      
         if(k ) {
            this.showList.push(element);
         }
        
        });
      }
  
    }
  }

  SelectedLine(event: any): void
{
  if(this.lineIdChoosen != event.target.value)
  {
    this.lineIdChoosen = event.target.value;
    if(event.target.value != 0)
    {
      this.boolic = true;
      this.SplitDepartures();
    }
    else
    {
      this.boolic = false;
    }
  }
  
}

SplitDepartures(){

  this.stringovi1 = [];
  
  this.allTimetables.forEach(element => {
    if(element.line == this.lineIdChoosen && element.dayType == this.dt)
    {
      this.stringovi1= element.departures.split(";");
      this.stringovi1.splice(this.stringovi1.length-1,1);
      
    }
    
  });

  console.log(this.stringovi1);

}

}
