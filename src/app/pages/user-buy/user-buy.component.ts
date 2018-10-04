import { Component, OnInit, ViewEncapsulation ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { AuthService } from "../../services/auth-service.service";
import { ExchangerService } from "../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-user-buy',
  templateUrl: './user-buy.component.html',
  styleUrls: ['./user-buy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBuyComponent implements OnInit {
  displayedColumns: string[] = ['exchanger', 'amount', 'expire', 'code','status','attach'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  exchangers=[];
  public burnForm: FormGroup;
  public completeReciptForm: FormGroup;
  public details: any = {};
  selectedRecipt;
  selectedExchangerEmail;
  msg;
  success;
  err;
  pendingRecipts;
  ax;
  photo;
  ///
  exchangerEmail;
  reciptCode;
  amount;
  expiredDate;
  verificationCode;
  receiptNumber;
  ///
  constructor(router: Router, private authService: AuthService,private exchangerService: ExchangerService, private formBuilder: FormBuilder,) { 
    this.authService.exchangerList().subscribe(data=>{
      this.exchangers = data['exchangers'];
    });

    this.authService.listPendingReceipt().subscribe(data=>{
      this.pendingRecipts= data['receipts'];
      let pendingRecipts = data['receipts'];
      console.log(this.pendingRecipts);
      
      this.dataSource = new MatTableDataSource(pendingRecipts);
      this.dataSource.paginator = this.paginator;
    })

    this.burnForm = this.formBuilder.group({
      'amount':['',Validators.required],
      'exchanger':['']
    });
    this.completeReciptForm = this.formBuilder.group({
      'img':['',Validators.required]
    })

  //   this.selectedExchanger = this.exchangers.filter(exchanger=>{
  //     this.selectedExchangerEmail == exchanger.email ;
  //  });



    
  }


  ngOnInit() {
  }
  submit(){
    this.details.exchangerEmail = this.burnForm.value.exchanger;
    this.details.amount = this.burnForm.value.amount;
    this.authService.createReceipt(this.details).subscribe(data=>{
      console.log(data);
      this.msg = data['msg'];
      let success = data['success'];
      if (success) {
        this.success = true;
        setTimeout(() => {
          location.reload()
      }, 4000);
      }
      if (!success) {
        this.err = true;
        
      }
      
    })
    // console.log(this.details);
    // console.log(this.selectedExchanger);
    
    
  }
  send(){
    this.details.receipt = this.ax;
    this.details.receiptNumber = this.receiptNumber;
    if (this.completeReciptForm.valid) {
      this.authService.uploadReceipt(this.details).subscribe(data=>{
        console.log(data);
        this.msg = data['msg'];
        let success = data['success'];
        if (success) {
          this.success = true;
          setTimeout(() => {
            location.reload()
        }, 4000);
        }
        if (!success) {
          this.err = true;
          setTimeout(() => {
            location.reload()
        }, 3000);
        }
        
      })
    }

    
  }
  getRecipt(code){
    this.receiptNumber = code;
    this.pendingRecipts.forEach(element => {
      if (element.receiptNumber == code) {
        this.selectedRecipt = element;
        this.exchangerEmail = this.selectedRecipt.exchangerEmail;
        this.reciptCode = this.selectedRecipt.receiptNumber;
        this.expiredDate = this.selectedRecipt.codeExpiration;
        this.amount = this.selectedRecipt.amount
      }
    });
    
  }
  getExchanger(){
    this.selectedExchangerEmail = this.burnForm.value.exchanger;
    this.details.exchangerEmail = this.selectedExchangerEmail
    this.authService.getExchanger(this.details).subscribe(data=>{
      console.log(data);
      
    })
    
  }
  PersonImage(event) {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
        console.log(fileType);


    if (fileType !='image/png') {
        if (fileType !='image/jpg') {
            if (fileType != 'image/jpeg') {
                // document.getElementById('secondForm').reset();
                // document.getElementById('imginput').value =''

                console.log(event.target.files[0]);
            }


        }

    }if(fileSize > 1000000){
        // document.getElementById('secondForm').reset();
        // event.target.files[0]='';


    }
    else{
        console.log(event.target.files[0]);
        this.ax =event.target.files[0];

        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = () => {
            this.photo = reader.result;
        }
        reader.readAsDataURL(file);  

    }
    

}
}
