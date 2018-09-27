import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { ExchangerService } from "../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-compelet-user-buy',
  templateUrl: './compelet-user-buy.component.html',
  styleUrls: ['./compelet-user-buy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompeletUserBuyComponent implements OnInit {
  receipts;
  fileExtension: any;
  fileExtensionMessage: any;
  fileExtensionError: boolean ;
  haveImg:boolean=false;
  ax: AbstractControl;
  public photo: any;
  public form: FormGroup;
  public details: any = {};
  dataSuccess:boolean=false;
  dataMsg;
  receiptNum;
  confirmed=false;
  constructor(router: Router, private authService: AuthService,private exchangerService: ExchangerService, private fb: FormBuilder, private flashMessage: FlashMessagesService ) { 

    this.authService.listReceipt().subscribe(data=>{
      this.receipts = data['receipts']
      this.receipts.forEach(i => {
        console.log(i.exchangerSubmitDate);
        
        i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
    });
      console.log(data);
      
    });
    this.form = fb.group({

      'comment': ['', Validators.required],
      'receipt': [''],


    });
  }

  ngOnInit() {
  }
  pending(receiptNum){
    this.receiptNum = receiptNum
    console.log(receiptNum);
    
  }
  onSubmit(value){
    this.details.receipt = this.ax;
    this.details.comment =this.form.controls['comment'].value;
    this.details.receiptNumber = this.receiptNum;
    this.authService.uploadReceipt(this.details).subscribe(data=>{
      let msg = data['msg'];
      let success = data['success'];

      if (success) {
          this.flashMessage.show(msg, { cssClass: 'alert-success', timeout: 3000 });
          this.dataSuccess = true;
          this.dataMsg = msg;
          this.confirmed = true;
          setTimeout(() => {
            location.reload()
        }, 3000); 

      } 
      if (!success) {
          this.flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 3000 });
          this.dataSuccess = false;
          this.dataMsg = msg;

      }
      
    })
    
  }

  image(event) {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
        console.log(fileType);


    if (fileType !='image/png') {
        if (fileType !='image/jpg') {
            if (fileType != 'image/jpeg') {
                // document.getElementById('secondForm').reset();
                // document.getElementById('imginput').value =''
                this.fileExtensionError = true;
                this.fileExtensionMessage='';
                this.fileExtensionMessage='This is Not an Valid image please select .png or .jpg file';
                console.log(event.target.files[0]);
                this.ax = null;
                this.photo = null;
            }


        }

    }if(fileSize > 1000000){
        // document.getElementById('secondForm').reset();
        // event.target.files[0]='';

        this.fileExtensionError = true;
        this.fileExtensionMessage='';
        this.fileExtensionMessage='Maximum image size is : 1MB';
        this.ax = null;
        this.photo = null;
    }
    else{
        console.log(event.target.files[0]);
        this.ax =event.target.files[0];
        this.fileExtensionError = false;
        this.fileExtensionMessage='';
        this.haveImg=true;
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = () => {
            this.photo = reader.result;
        }
        reader.readAsDataURL(file);  

    }
    

}
}
