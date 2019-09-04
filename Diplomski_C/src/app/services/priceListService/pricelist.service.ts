import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceListModel } from 'src/app/model/pricelistModel';
import { TicketPricesPomModel } from 'src/app/model/ticketPricesPomModel';

@Injectable({
  providedIn: 'root'
})
export class PricelistServiceService {
  private token: string;
  base_url = "http://localhost:52295"
  constructor( private httpClient:HttpClient) { }
  private request(method: 'post'|'get', type: 'addPricelist'|'getPricelist'|'getPricelistLast' | 'getTicketPrices', user?: TicketPricesPomModel,  id?:any): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
    } else if(method === 'get') {
     if(type ==='getTicketPrices'){
    
      base =  this.httpClient.get(`/api/${type}`, {headers: { Authorization: `Bearer ${this.getToken()}` },params: {ids:id}});
     } 
      else{
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
     } 
    }
    else {
     
    }
    return base;
  }
  public getPricelist(): Observable<any> {
    return this.request('get', 'getPricelist');
  }
  public getPricelistLast(): Observable<any> {
    return this.request('get', 'getPricelistLast');
  }

  public addPricelist(stat: TicketPricesPomModel): Observable<any> {
    return this.request('post', 'addPricelist', stat);
  }
  public getTicketPrices(id: any): Observable<any>{
    return this.request('get','getTicketPrices',null,id);
  }

  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

}
