import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private token: string;
  base_url = "http://localhost:52295"
  constructor(private httpClient:HttpClient) { }
 
  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
 
  private request(method: 'post'|'get', type: 'getAllTicketTypes' | 'addTickets' |'addPayPal' | 'getTypeUser'|'checkValidity' | 'validateTicketNoUser' |'validateTicket'|'getTicketsForOneUser' | 'addPayPal', t?: FormData, e?:any): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, t);
    } else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }} );
      if(type === 'getTypeUser'){
        base =  this.httpClient.get(`/api/${type}/`+e);
      }
    }

  
    return base;
  }
  public getAllTicketTypes(): Observable<any> {
    return this.request('get', 'getAllTicketTypes');
  }

  
  public getTypeUser(email : any) {
    return this.request('get','getTypeUser',null,email);
  }
  public addTicket(ticket): Observable<any>{
    
    return  this.request('post', 'addTickets',ticket);
  }

  public addPayPal(payPal): Observable<any> {
    return this.request('post','addPayPal',payPal);
  }

  SendMail(ticket): Observable<any>{
    
    return this.httpClient.post(this.base_url+"/api/Tickets/SendMail",ticket);
  }

  getTicket(id) {
    return this.httpClient.get(this.base_url+"/api/Tickets/GetTicket?id="+id);
  }
  public getAllTicketsForOneUser(id){
    return this.request('get','getTicketsForOneUser',id);
  }
 public  checkValidity(bla) : Observable<any> {
    return this.request('post','checkValidity', bla);
  }

 public validateTicketNoUser(ticket) : Observable<any> {
    return this.request('post','validateTicketNoUser', ticket);
  }
  public validateTicket(ticket) : Observable<any> {
    return this.request('post','validateTicket', ticket);
  }
}
