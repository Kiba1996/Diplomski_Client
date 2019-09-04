import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { NgForm } from '@angular/forms';
import { VehicleModel } from 'src/app/model/vehicleModel';

@Component({
  selector: 'app-add-change-vehicle',
  templateUrl: './add-change-vehicle.component.html',
  styleUrls: ['./add-change-vehicle.component.css']
})
export class AddChangeVehicleComponent implements OnInit {

  
  private selected: string="";
  availableVehicles : any = [];
  NemaSobonihVozila : boolean = false;
  idVozila: string = "";

  constructor(private vehicleServ: VehicleService) {
    this.vehicleServ.getAllAvailableVehicles().subscribe(data =>{
      this.availableVehicles = data;
      console.log("availableVehicles: ", this.availableVehicles);
      if(this.availableVehicles == null || this.availableVehicles.length == 0 || this.availableVehicles== undefined)
      {
        this.NemaSobonihVozila = true;
      }

    });
    this.selected = "Add";
   }

  ngOnInit() {
  }
  onSubmit(vehicleData: VehicleModel, form: NgForm){

    if(this.selected == "Add")
    {
     
      console.log(vehicleData)
      this.vehicleServ.addVehicle(vehicleData).subscribe(data=>{
        window.alert("Vehicle successfully added!");
        form.reset();
        this.refresh();
      },
      err => {
        window.alert(err.error);
        this.refresh();
      });
    }
    else if(this.selected == "Remove"){

      if(this.idVozila == "" || this.idVozila == null)
      {
        vehicleData.Id = 0;
      }

        this.vehicleServ.deleteVehicle(vehicleData.Id.toString()).subscribe(data => {
          window.alert("Vehicle successfully removed!");
          form.reset();
          this.refresh();
        },
        err => {
          window.alert(err.error);
          this.refresh();
        });
    }

  }

  setradio(e: string): void   
  {  
        this.selected = e;
        this.refresh();      
  }  

  isSelected(name: string): boolean   
  { 
        if (!this.selected) { // if no radio button is selected, always return false so every nothing is shown  
            return false;  
        }  
        return (this.selected === name); // if current radio button is selected, return true, else return false  
  } 

  refresh(){
    this.NemaSobonihVozila = false;
    this.idVozila = "";
    this.vehicleServ.getAllAvailableVehicles().subscribe(data =>{
      this.availableVehicles = data;
      console.log("availableVehicles: ", this.availableVehicles);
      if(this.availableVehicles == null || this.availableVehicles.length == 0 || this.availableVehicles== undefined)
      {
        this.NemaSobonihVozila = true;
      }

    });
  }


}