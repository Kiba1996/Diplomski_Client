import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineModel } from 'src/app/model/lineModel';

@Injectable({
  providedIn: 'root'
})
export class LineServiceService {

  base_url = "http://localhost:52295"
  private token: string;
  constructor( private httpClient:HttpClient) { } 

  private request(method: 'post'|'get'|'delete', type: 'addLine'|'getAllLines'|'changeLine'|'removeLine'|'findVehicleId', user?: LineModel, stId?: any): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
      if(type ==='changeLine'){
        base=this.httpClient.post(`/api/${type}/`+stId, user);
      }
    } 
    else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      if(type === 'findVehicleId'){
        base =  this.httpClient.get(`/api/${type}`, {headers: { Authorization: `Bearer ${this.getToken()}` },params: {ids:stId}});
      }
    }
    else {
      base= this.httpClient.delete(`/api/${type}/`+ stId);
    }

    return base;
  }
  public getAllLines(): Observable<any> {
    return this.request('get', 'getAllLines');
  }

  public addLine(stat: LineModel): Observable<any> {
    return this.request('post', 'addLine', stat);
  }

  public changeLine(stat: LineModel,id: String) : Observable<any>{
    return this.request('post', 'changeLine', stat, id);
  }

  public deleteLine(stId: String) : Observable<any>{
    return this.request('delete', 'removeLine',null ,stId);   
  }
  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  FindVehicleId(id): Observable<any>{
    return this.request('get', 'findVehicleId',null ,id);
  }
  addSerialNumber(line): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Lines/SerialNumber",line);
  }

 
}
