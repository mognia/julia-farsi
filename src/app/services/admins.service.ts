import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { LoginComponent } from '../pages/login/login.component';
@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  authToken: any;
  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  // list all Receipt submited by user and exchange and ready for admin response
  ListPending(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.get('http://localhost:3000/admins/list-pending-receipt', { headers: headers })
  }
  ListApproved(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.get('http://localhost:3000/admins/list-approved-receipt', { headers: headers })
  }
  ListRejected(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.get('http://localhost:3000/admins/list-rejected-receipt', { headers: headers })
  }
  approveReceipt(form){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.post('http://localhost:3000/admins/approve-receipt',form, { headers: headers })
  }
  rejectReceipt(form){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.post('http://localhost:3000/admins/reject-receipt',form, { headers: headers })
  }
  lisPendingBurn(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.get('http://localhost:3000/admins/list-pending-burn', { headers: headers })
  }
  listApprovedBurn(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.get('http://localhost:3000/admins/list-approved-burn', { headers: headers })
  }
  listRejectedBurn(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.get('http://localhost:3000/admins/list-rejected-burn', { headers: headers })
  }
  rejectBurn(form){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.post('http://localhost:3000/admins/reject-burn',form, { headers: headers })
  }
  approveBurn(form){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
 
    
    return this.http.post('http://localhost:3000/admins/approve-burn',form, { headers: headers })
  }
  activeUser(email){

    this.loadToken();
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });

    return this.http.post('http://localhost:3000/admins/enable',email, { headers: headers })
  }
  deactiveUser(email){

    
    this.loadToken();
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });

    return this.http.post('http://localhost:3000/admins/disable',email, { headers: headers })
  }
  verifykyc(form) {
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admins/verifykyc', form, { headers: headers })
      // .map(res => res.json());
  }
  changeRole(form) {
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admins/changeroles', form, { headers: headers })
      // .map(res => res.json());
  }
  getUserList(){

    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/admins/listroles', { headers: headers })
    .map(result => result);
  }
  getUserListKyc(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/admins/listkyc', { headers: headers })
      // .map(res => res.json());
  }
  // Register Admin
  registerAdmin(form){
    console.log(form);
    
    
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let body = new FormData();
    body.append('email', form.email);
    body.append('firstName', form.firstName);
    body.append('lastName', form.lastName);
    body.append('roles', JSON.stringify(form.roles));
    body.append('image', form.image);

    return this.http.post('http://localhost:3000/admins/register-admin', body, { headers: headers })
  }
  registerExchanger(form){
    
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let body = new FormData();
    body.append('email', form.email);
    body.append('firstName', form.firstName);
    body.append('lastName', form.lastName);
    body.append('address', form.address);
    body.append('telephone', form.telephone);
    body.append('image', form.image);

    return this.http.post('http://localhost:3000/admins/register-exchanger', body, { headers: headers })
  }
  exchangerList(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/admins/exchangers', { headers: headers })
  }
}
