import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
