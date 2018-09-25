import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RpcService {
  authToken: any;
  constructor(private http: HttpClient) { }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  getPrice(type){
    
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    return this.http.post('http://localhost:3000/rpc/get-price',type, { headers: headers })
    .map(result => result);
  }
}
