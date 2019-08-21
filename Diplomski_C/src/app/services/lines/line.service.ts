import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineModel } from 'src/app/model/lineModel';

@Injectable({
  providedIn: 'root'
})
export class LineServiceService {

  base_url = "http://localhost:52295"
  private token: string;
  constructor( private httpClient:HttpClient) { } //private http: Http,

  private request(method: 'post'|'get'|'delete', type: 'addLine'|'getAllLines'|'changeLine'|'removeLine', user?: LineModel, stId?: String): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
      if(type ==='changeLine'){
        base=this.httpClient.post(`/api/${type}/`+stId, user);
      }
    } else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    else {
      base= this.httpClient.delete(`/api/${type}/`+ stId);
    }

    // const request = base.pipe(
    //   map((data: TokenResponse) => {
    //     if (data.token) {
    //       if( type === 'login')
    //       {
    //         this.saveToken(data.token);
    //       }
          
    //     }
    //     return data;
    //   })
    // );

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

  // addLine(line): any{
    
  //   return this.httpClient.post(this.base_url+"/api/Lines/Add",line);
  // }

  addSerialNumber(line): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Lines/SerialNumber",line);
  }

  // getAllLines() {
  //   return this.httpClient.get(this.base_url+"/api/Lines/GetLines");
  // }

  // deleteLine(id){
    
  //   return this.httpClient.delete(this.base_url+"/api/Lines/Delete?id=" + id);
  // }

  // changeLine(id,line): Observable<any>{
    
  //   return this.httpClient.put(this.base_url+"/api/Lines/Change?id=" + id,line);
  // }
  FindVehicleId(id): Observable<any>{
    return this.httpClient.get(this.base_url+"/api/Lines/FindVehicle?id=" + id)
  }
}
