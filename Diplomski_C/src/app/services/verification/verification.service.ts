import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private token: string;
  constructor(private httpClient:HttpClient) { }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get'|'delete', type: 'declineUser'|'authorizeUser'|'declineController'|'authorizeController'|'getAwaitingAdmins'|'getAwaitingControllers'|'getAwaitingClients'| 'authorizeAdmin'| 'declineAdmin', user?: FormData, stId?: string): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`,user);
    } else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    else {
      base= this.httpClient.delete(`/api/${type}/`+ stId);
    }



    return base;
  }



  public getAwaitingAdmins() : Observable<any>
  {
    return this.request('get','getAwaitingAdmins');
  }

  public getAwaitingControllers() : Observable<any>
  {
    return this.request('get','getAwaitingControllers');
  }
  public getAwaitingClients() : Observable<any>
  {
    return this.request('get','getAwaitingClients');
  }
  public authorizeAdmin(a : FormData) : Observable<any>
  {
    return this.request('post','authorizeAdmin', a);
  }
  public declineAdmin(a : FormData) : Observable<any>
  {
    return this.request('post','declineAdmin', a);
  }
  public authorizeController(a : FormData) : Observable<any>
  {
    return this.request('post','authorizeController', a);
  }
  public declineController(a : FormData) : Observable<any>
  {
    return this.request('post','declineController', a);
  }
  public authorizeUser(a : FormData) : Observable<any>
  {
    return this.request('post','authorizeUser', a);
  }
  public declineUser(a : FormData) : Observable<any>
  {
    return this.request('post','declineUser', a);
  }

}