import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "./auth-service.service";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  authToken: any;
   ticketNum
  constructor(private authService:AuthService,private http: HttpClient) { }

  create(ticket){
    console.log(ticket);
    
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    let body = new FormData();
    body.append('subject', ticket.subject);
    body.append('description', ticket.description);
    body.append('tokenType', ticket.tokenType);
    body.append('recieveEmail', ticket.recieveEmail);
    body.append('attachment', ticket.file);
    console.log(body);
    
    return this.http.post('http://localhost:3000/tickets/create', body, { headers: headers })
      ////.map(res => res.json());
  }
  listmy(){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/tickets/listmy', { headers: headers });
      //.map(res => res.json());
  }
  currentTicket(num){
    this.ticketNum = num;
    
  }
  GetCurrentTicket(){
    return this.ticketNum;
  }
  replay(values){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('http://localhost:3000/tickets/replay',values, { headers: headers })
      //.map(res => res.json());
  }
  listAdmin(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/tickets/listall', { headers: headers })
      //.map(res => res.json());
  }
  answer(values){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('http://localhost:3000/tickets/answer',values, { headers: headers })
      //.map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;

    
  }
  cancel(ticketNumber){

        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('http://localhost:3000/tickets/cancel',ticketNumber, { headers: headers })
  }
  resolve(ticketNumber){
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('http://localhost:3000/tickets/resolve',ticketNumber, { headers: headers })
  }
}