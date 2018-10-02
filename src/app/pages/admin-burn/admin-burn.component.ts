import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { AdminsService } from "../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-burn',
  templateUrl: './admin-burn.component.html',
  styleUrls: ['./admin-burn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminBurnComponent implements OnInit {
  pendingBurns;
  approvedBurns;
  rejectedBurns;
  noPending;
  noApproved;
  noReject;
  public approveForm: FormGroup;
  public rejectForm: FormGroup;
  reciptNum;
  public details: any = {};
  Msg;
  success;
  err;
  constructor(router: Router, private authService: AuthService,private adminsService: AdminsService, private fb: FormBuilder, private flashMessage: FlashMessagesService) { 
    this.adminsService.lisPendingBurn()
    this.adminsService.lisPendingBurn().subscribe(data=>{
      console.log(data);
      
      this.pendingBurns = data['burnRequests'];
      if (this.pendingBurns.length==0) {
        this.noPending = true;
      }
      this.pendingBurns.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
    this.adminsService.listApprovedBurn().subscribe(data=>{
      console.log(data);
      
      this.approvedBurns = data['burnRequests'];
      if (this.pendingBurns.length==0) {
        this.noApproved = true;
      }
      this.approvedBurns.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
    this.adminsService.listRejectedBurn().subscribe(data=>{
      console.log(data);
      
      this.rejectedBurns = data['burnRequests'];
      if (this.rejectedBurns.length==0) {
        this.noReject = true;
      }
      this.rejectedBurns.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
    this.approveForm =fb.group({
      'comment': [''],

    });
    this.rejectForm =fb.group({
      'comment': ['',Validators.required],

    });
  }
  getNum(num){
    this.reciptNum = num;
  }
  approve(){
    this.details.comment =this.approveForm.controls['comment'].value;
    this.details.burnRequestNumber = this.reciptNum;
    this.adminsService.approveBurn(this.details).subscribe(data=>{
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
  reject(){
    this.details.comment =this.rejectForm.controls['comment'].value;

    this.details.burnRequestNumber = this.reciptNum;
    if (this.rejectForm.valid) {
      console.log('valiiiid');
      
      this.adminsService.rejectBurn(this.details).subscribe(data=>{
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
  ngOnInit() {
  }

}
