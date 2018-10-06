import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { UserInfo, UserReceipt } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class ExchangerService {
    authToken: any;

    constructor(private http: HttpClient) { 
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    getKyc(userNumber){
        
        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.post('http://localhost:3000/exchangers/get-kyc', { "userNumber": userNumber}, { headers: headers })
    }

    getUser(userEmail){

        this.loadToken();
        let headers = new HttpHeaders({'Authorization' : this.authToken});
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.post('http://localhost:3000/exchangers/get-user', {"userEmail":userEmail}, { headers: headers })
        .map(c => {
            let user: UserInfo = c['user']
            return user
        })
    }

    receipt(form) {

        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
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

        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.get('http://localhost:3000/exchangers/list-receipt', { headers: headers })
        .map(c => {
            let users: UserReceipt[] = c['receipts']
            return users
        })
    }

    getPendingList() {

        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.get('http://localhost:3000/exchangers/list-pending-receipt', { headers: headers })
        .map(c => {
            let users: UserReceipt[] = c['receipts']
            return users
        })
        
    }

    confirmReceipt(receipt) {
        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        let body = new FormData()
        body.append('receiptNumber', receipt.receiptNumber)
        body.append('comment', receipt.comment)
        body.append('receipt', receipt.receipt)

        return this.http.post('http://localhost:3000/exchangers/complete-receipt', 
        body,
        { headers: headers })
        // .map(c => {
        //     let users: UserReceipt[] = c['receipts']
        //     return users
        // })
    }

}
