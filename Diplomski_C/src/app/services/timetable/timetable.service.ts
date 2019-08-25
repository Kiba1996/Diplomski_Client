import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { TimetableModel } from 'src/app/model/timetableModel';
import { DayTypeModel } from 'src/app/model/dayTypeModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  base_url = "http://localhost:52295"
  private token: string;
  constructor( private httpClient:HttpClient, private router: Router) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'delete', type: 'addTimetable'|'getAllTimetables'|'changeTimetable'|'removeTimetable'| 'getAllDayTypes', user?: TimetableModel, stId?: String): Observable<any> {
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
  public getAllTimetables(): Observable<any> {
    return this.request('get', 'getAllTimetables');
  }

  public addTimetable(stat: TimetableModel): Observable<any> {
    return this.request('post', 'addTimetable', stat);
  }

  public changeTimetable(stat: TimetableModel) : Observable<any>{
    return this.request('post', 'changeTimetable', stat,null);
  }

  public deleteTimetable(stId: String) : Observable<any>{
    return this.request('delete', 'removeTimetable',null ,stId);   
  }
  getAllDayTypes(): Observable<any> {
     return this.request('get','getAllDayTypes');
   }


  // addTimetable(timetable): any{
    
  //   return this.httpClient.post(this.base_url+"/api/Timetables/Add",timetable);
  // }

  

  // getAllTimetables() {
  //   return this.httpClient.get(this.base_url+"/api/Timetables/GetTimetables");
  // }

  // getAllDayTypes() {
  //   return this.httpClient.get(this.base_url+"/api/DayTypes/GetDayTypes");
  // }

  // deleteTimetable(id){
    
  //   return this.httpClient.delete(this.base_url+"/api/Timetables/Delete?id=" + id);
  // }

  // changeTimetable(id,timetable): Observable<any>{
    
  //   return this.httpClient.put(this.base_url+"/api/Timetables/Change?id=" + id,timetable);
  // }
}
