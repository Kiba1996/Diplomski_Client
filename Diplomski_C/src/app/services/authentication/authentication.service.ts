import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { RegModel } from 'src/app/model/regModel';


export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  surname: string;
  address: string;
  birthday: Date;
  image: string;
  activated: string;
  role: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;      

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile'|'edit'|'editPassword', user?: FormData, u?:RegModel): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
      if(type === 'edit'){
        base = this.http.post(`/api/${type}`, user);
      }
    } 
    else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          if( type === 'login')
          {
            this.saveToken(data.token);
          }
          
        }
        return data;
      })
    );

    return request;
  }

  public register(user: FormData): Observable<any> {
    return this.request('post', 'register',user);
  }

  public edit(user: FormData): Observable<any>{
    return this.request('post','edit', user);
  }
  public login(user: FormData): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }
public editPassword(user: FormData):Observable<any>{
  return  this.request('post','editPassword', user);
}
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigateByUrl('/');
  }
}

