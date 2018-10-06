import { Component, OnInit, ViewEncapsulation ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { ExchangerService } from "../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MatPaginator, MatTableDataSource} from '@angular/material';

 
@Component({
  selector: 'app-user-burn',
  templateUrl: './user-burn.component.html',
  styleUrls: ['./user-burn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBurnComponent implements OnInit {
  displayedColumns: string[] = ['submitDate', 'amount', 'status', 'tokenPrice','reqNum'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;

  public burnForm: FormGroup;
  public confirmForm: FormGroup;
  public rejectForm : FormGroup;
  public details: any = {};
  Msg;
  notSuccess=false;
  noBurnSuccess=false;
  BurnSuccess=false;
  success =false;
  PendingBurnRequests;
  allBurnRequests;
  burnReqNumber;
  confirmed = false;
  resend=false;
  noresend=false;
  balance;
  err;
  constructor(router: Router, private authService: AuthService,private exchangerService: ExchangerService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService) { 


    this.burnForm = this.formBuilder.group({
      'amount':['',Validators.required],
      'password':['',Validators.required]
    });
    this.confirmForm = this.formBuilder.group({
      'code':['',Validators.required],
    });
    this.rejectForm =formBuilder.group({
      'comment': ['',Validators.required],

    });
    this.authService.listPendingBurn().subscribe(data=>{
      this.PendingBurnRequests = data['burnRequests'];
      console.log(this.PendingBurnRequests);
      this.dataSource = new MatTableDataSource(this.PendingBurnRequests);
      this.dataSource.paginator = this.paginator;
      this.PendingBurnRequests.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
      
    });
    this.authService.getBalance().subscribe(data=>{
      this.balance = data['balance']

      console.log(data);
      
    });

  }

  ngOnInit() {

  }
  pending(BurnRequestNumber){
    this.burnReqNumber = BurnRequestNumber;
  }
  getNum(num){
    this.burnReqNumber = num;
  }
  resendBurn(number){
    this.details.burnRequestNumber = number;
    
    this.authService.resendConfirmCode(this.details).subscribe(data=>{
      console.log(data);
      
      this.Msg = data['msg'];
      let success = data['success'];
      if (success) {
        this.resend = true;
        
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
      if (!success) {
        this.noresend = true;
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
    })
  }
  verifyBurn(){
    this.details.burnRequestNumber = this.burnReqNumber;
    this.details.verificationToken = this.confirmForm.controls['code'].value;
    this.authService.verifyBurn(this.details)
    .subscribe(data=>{
      this.Msg = data['msg'];
      let success = data['success'];
      if (success) {
        this.BurnSuccess = true;
        
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
      if (!success) {
        this.noBurnSuccess = true;
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
      
    })
  }
  reject(){
    this.details.comment =this.rejectForm.controls['comment'].value;

    this.details.burnRequestNumber = this.burnReqNumber;
    if (this.rejectForm.valid) {
      console.log('valiiiid');
      
      this.authService.rejectBurn(this.details).subscribe(data=>{
        console.log(data);
        
        this.Msg = data['msg'];
        let success = data['success'];
  
        if(success) {
          this.err = false;
          this.success = true;
        //   setTimeout(() => {
        //     location.reload()
        // }, 3000);
        } if(!success) {
          this.success = false;
          this.err = true;
        //   setTimeout(() => {
        //     location.reload()
        // }, 3000); 
        }
        
      })   
    } else{
      console.log('not valiiiid');
      
    }

    
  }
  burn(){
    if (this.burnForm.valid) {
      this.details.password =this.burnForm.controls['password'].value;
      this.details.amount =this.burnForm.controls['amount'].value;
      this.authService.burn(this.details).subscribe(data=>{
        this.Msg = data['msg'];
        let success = data['success'];
        if (success) {
          this.success = true;
          this.flashMessage.show(this.Msg, {cssClass: 'alert-success', timeout: 10000});
          setTimeout(() => {
            location.reload()
        }, 5000);
        }
        if (!success) {
          this.flashMessage.show(this.Msg, {cssClass: 'alert-danger', timeout: 10000});
          this.notSuccess = true;
        //   setTimeout(() => {
        //     location.reload()
        // }, 5000);
        }
        console.log(data);
        
      })
    }

  }

}
