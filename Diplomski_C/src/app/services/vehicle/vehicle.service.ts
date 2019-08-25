import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModel } from 'src/app/model/vehicleModel';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private token: string;
  constructor(private httpClient:HttpClient) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'delete', type: 'addVehicle'|'getAllVehicles'|'getAllAvailableVehicles'|'removeVehicle', user?: VehicleModel, stId?: String): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
    } else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    else {
      base= this.httpClient.delete(`/api/${type}/`+ stId);
    }

   
    return base;
  }
  public getAllVehicles(): Observable<any> {
    return this.request('get', 'getAllVehicles');
  }

  public addVehicle(vehic: VehicleModel): Observable<any> {
    return this.request('post', 'addVehicle', vehic);
  }

  public getAllAvailableVehicles() : Observable<any>{
    return this.request('get', 'getAllAvailableVehicles');
  }

  public deleteVehicle(vId: String) : Observable<any>{
    return this.request('delete', 'removeVehicle',null ,vId);   
  }




  // getAllVehicles() {
  //   return this.httpClient.get(this.base_url+"/api/Vehicles/GetVehicles");
  // }

  // addVehicle(vehicle): Observable<any>{

  //   return this.httpClient.post(this.base_url+"/api/Vehicles/Add",vehicle);
  // }

  // GetAllAvailableVehicles(): Observable<any>{
  //   return this.httpClient.get(this.base_url+"/api/Vehicles/GetAvailableVehicles");
  // }

  // deleteVehicle(id){

  //   return this.httpClient.delete(this.base_url+"/api/Vehicles/Delete?id=" + id);
  // }
}