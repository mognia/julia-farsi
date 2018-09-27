import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ExchangerService {
  authToken: any;
  constructor(private http: HttpClient) { }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  getKyc(userNumber){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.post('http://localhost:3000/exchangers/get-kyc', {"userNumber":userNumber}, { headers: headers })
  }

  receipt(form){
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'multipart/form-data');
    let body = new FormData();
    // body.append('email', form.email);
    body.append('receipt', form.receipt);
    body.append('exchangerComment', form.comment);
    body.append('amount', form.amount);
    body.append('userNumber', form.userNumber);

    return this.http.post('http://localhost:3000/exchangers/receipt', body, { headers: headers })
    
  }
  getList(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.get('http://localhost:3000/exchangers/list-receipt', { headers: headers })
  }
}
