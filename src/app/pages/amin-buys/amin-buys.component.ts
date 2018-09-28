import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { AdminsService } from "../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-amin-buys',
  templateUrl: './amin-buys.component.html',
  styleUrls: ['./amin-buys.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AminBuysComponent implements OnInit {
  pendingReceipts;
  approvedReceipts;
  rejectedReceipts;
  userImg;
  exchangerImg;
  reciptNum;
  Msg;
  success;
  err;
  noPending=false;
  noApproved=false;
  btndisable=true;
  noRejected=false;
  public approveForm: FormGroup;
  public rejectForm: FormGroup;
  public details: any = {};
  constructor(router: Router, private authService: AuthService,private adminsService: AdminsService, private fb: FormBuilder, private flashMessage: FlashMessagesService) {
    this.adminsService.ListPending();
    this.approveForm =fb.group({
      'comment': [''],

    });
    this.rejectForm =fb.group({
      'comment': ['',Validators.required],

    });
   }

  ngOnInit() {
    this.adminsService.ListPending().subscribe(data=>{

      this.pendingReceipts = data['receipts'];
      console.log(this.pendingReceipts);
      
      if (this.pendingReceipts.length==0) {
        this.noPending = true;
      }
      this.userImg = this.pendingReceipts.exchangerReceipt
      this.exchangerImg = data['userReceipt']
      this.pendingReceipts.forEach(i => {
        console.log(i.exchangerSubmitDate);
        
        i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
    });
      
    });
    this.adminsService.ListApproved().subscribe(data=>{

      this.approvedReceipts = data['receipts'];
      console.log(this.approvedReceipts);
      
      
      if (this.approvedReceipts.length==0) {
        this.noApproved = true;
      }
      this.userImg = this.pendingReceipts.exchangerReceipt
      this.approvedReceipts.forEach(i => {
        console.log(i.exchangerSubmitDate);
        
        i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
    });
      
    });
    this.adminsService.ListRejected().subscribe(data=>{

      this.rejectedReceipts = data['receipts'];
      console.log(this.rejectedReceipts);
      
      
      if (this.rejectedReceipts.length==0) {
        this.noRejected = true;
      }

      this.rejectedReceipts.forEach(i => {
        console.log(i.exchangerSubmitDate);
        
        i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
    });
      
    });
  }
  getNum(num){
    this.reciptNum = num;
  }
  approve(){
    this.details.comment =this.approveForm.controls['comment'].value;
    this.details.receiptNumber = this.reciptNum;
    this.adminsService.approveReceipt(this.details).subscribe(data=>{
      console.log(data);
      
      this.Msg = data['msg'];
      let success = data['success'];

      if(success) {
        this.err = false;
        this.success = true;
        setTimeout(() => {
          location.reload()
      }, 3000);
      } if(!success) {
        this.success = false;
        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
      
    })
    
  }
  reload(){
                location.reload()
  }
  reject(){
    this.details.comment =this.approveForm.controls['comment'].value;

    this.details.receiptNumber = this.reciptNum;
    if (this.rejectForm.valid) {
      console.log('valiiiid');
      
      this.adminsService.rejectReceipt(this.details).subscribe(data=>{
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
}
