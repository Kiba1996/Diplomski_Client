import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StationModel } from 'src/app/model/stationModel';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class StationService {
  //base_url = "http://localhost:52295"
  private token: string;
  constructor( private httpClient:HttpClient, private router: Router) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'delete', type: 'addStation'|'getAllStations'|'changeStation'|'removeStation', user?: StationModel, stId?: String): Observable<any> {
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
  public getAllStations(): Observable<any> {
    return this.request('get', 'getAllStations');
  }

  public addStation(stat: StationModel): Observable<any> {
    return this.request('post', 'addStation', stat);
  }

  public changeStation(stat: StationModel) : Observable<any>{
    return this.request('post', 'changeStation', stat);
  }

  public deleteStation(stId: String) : Observable<any>{
    return this.request('delete', 'removeStation',null ,stId);   
  }

 

}
