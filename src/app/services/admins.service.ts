import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  authToken: any;
  constructor(private http: HttpClient) { 

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
}
