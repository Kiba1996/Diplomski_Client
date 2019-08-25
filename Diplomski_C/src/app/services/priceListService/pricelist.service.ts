import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
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
  constructor( private httpClient:HttpClient) { } //private http: Http,
  private request(method: 'post'|'get', type: 'addPricelist'|'getPricelist'|'getPricelistLast' | 'getTicketPrices', user?: TicketPricesPomModel,  id?:any): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(`/api/${type}`, user);
      // if(type ==='changePricelist'){
      //   base=this.httpClient.post(`/api/${type}/`+stId, user);
      // }
    } else if(method === 'get') {
     if(type ==='getTicketPrices'){
    
      base =  this.httpClient.get(`/api/${type}`, {headers: { Authorization: `Bearer ${this.getToken()}` },params: {ids:id}});
     } 
      else{
      base = this.httpClient.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
     } 
    }
    else {
      //base= this.httpClient.delete(`/api/${type}/`+ stId);
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

  // public changePricelist(stat: PriceListModel,id: String) : Observable<any>{
  //   return this.request('post', 'changePricelist', stat, id);
  // }

  // public deleteLine(stId: String) : Observable<any>{
  //   return this.request('delete', 'removeLine',null ,stId);   
  // }
  private getToken(): string { 
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

//   addPricelist(pricelist): any{
//     return this.httpClient.post(this.base_url+"/api/Pricelists/Add",pricelist);
//   }
//   addTicketPrices(ticketprices): any{
//     return this.httpClient.post(this.base_url+"/api/TicketPrices/AddTicketPrices",ticketprices);
//   }
//   getValidPrices(id){
//     return this.httpClient.get(this.base_url+"/api/TicketPrices/GetValidPrices?id=" + id);
//   }

//   getAllPricelists() {
//     return this.httpClient.get(this.base_url+"/api/Pricelists/GetPricelists");
//   }
// getPricelist(){
//   return this.httpClient.get(this.base_url+"/api/Pricelists/GetPricelist");
// }

// getPricelistLast(){
//   return this.httpClient.get(this.base_url+"/api/Pricelists/GetPricelistLast");
// }
//   deletePricelist(id){
//     return this.httpClient.delete(this.base_url+"/api/Pricelists/Delete?id=" + id);
//   }

//   changePricelist(id,pricelist): Observable<any>{
//     return this.httpClient.put(this.base_url+"/api/Pricelists/Change?id=" + id,pricelist);
//   }

}
