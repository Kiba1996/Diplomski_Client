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
 
  private request(method: 'post'|'get', type: 'getAllTicketTypes' | 'addTickets' |'addPayPal' | 'getTicket'|'getTypeUser'|'checkValidity' | 'validateTicketNoUser' |'validateTicket'|'getTicketsForOneUser' | 'addPayPal'|'getTicketPrice' | 'sendMail', t?: FormData, e?:any): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, t);
      if(type==='validateTicketNoUser'){
        base = this.httpClient.post(`/api/${type}`, e);
      }
      if(type === 'validateTicket'){
        base=this.httpClient.post(`/api/${type}/`+e.em, e.ti);
      }
    } else if(method === 'get') {
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }} );
      if(type === 'getTypeUser' || type==='getTicketsForOneUser' || type==='getTicket'){
        base =  this.httpClient.get(`/api/${type}/`+e);
      }
      if(type === 'getTicketPrice'){
        base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }, params:{user: e.user, ticketPrice: e.ticketPrice}} );
      }
    }

  
    return base;
  }
  public getAllTicketTypes(): Observable<any> {
    return this.request('get', 'getAllTicketTypes');
  }
public getTicketPrice(fd: any): Observable<any>{
  return this.request('get', 'getTicketPrice', null,fd);
}

  
  public getTypeUser(email : any): Observable<any> {
    return this.request('get','getTypeUser',null,email);
  }
  public addTicket(ticket): Observable<any>{
    
    return  this.request('post', 'addTickets',ticket);
  }

  public addPayPal(payPal): Observable<any> {
    return this.request('post','addPayPal',payPal);
  }

  public SendMail(ticket): Observable<any>{
    
    return this.request('post','sendMail',ticket);
  }

  public getTicket(id) : Observable<any>{
    return this.request('get','getTicket',null,id);
  }
  public getAllTicketsForOneUser(id): Observable<any>{
    return this.request('get','getTicketsForOneUser',null,id);
  }
 public  checkValidity(bla) : Observable<any> {
    return this.request('post','checkValidity', bla);
  }

 public validateTicketNoUser(ticket:any) : Observable<any> {
    return this.request('post','validateTicketNoUser', null,ticket);
  }
  public validateTicket(email: any,ticket:any) : Observable<any> {
    return this.request('post','validateTicket', null,{em:email,ti:ticket});
  }
}
