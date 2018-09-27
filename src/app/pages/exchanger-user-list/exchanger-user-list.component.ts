import { Component, OnInit, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { ExchangerService } from "../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-exchanger-user-list',
  templateUrl: './exchanger-user-list.component.html',
  styleUrls: ['./exchanger-user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExchangerUserListComponent implements OnInit {
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2000, 0, 1);
  public steps: any[];

  public personalForm: FormGroup;
  public search : FormGroup;

  public userNum :AbstractControl;
  public details: any = {};
  public showConfirm: boolean;
  public confirmed: boolean;
  public photo: any;
  public router: Router;
  dataSuccess:boolean=false;
  dataMsg;
  user;
  //
  KYCVerified:boolean=false;
  address;
  email;
  firstName;
  lastname;
  passImg;
  telephone;
  walletAddress;
  reseted:boolean=false;
  userNumber;
  //
  haveImg:boolean=false;
  ax;
  receipts
   fileExtensionError: boolean ;

  fileExtensionMessage: any;

  image(event) {
      let fileType = event.target.files[0].type;
      let fileSize = event.target.files[0].size;
          console.log(fileType);
          if (!event.target.files && !event.target.files[0]) {
              
              this.haveImg = false;
              
          }

      if (fileType !='image/png') {
          if (fileType !='image/jpg') {
              if (fileType != 'image/jpeg') {
                  // document.getElementById('secondForm').reset();
                  // document.getElementById('imginput').value =''
                  this.fileExtensionError = true;
                  this.fileExtensionMessage='';
                  this.fileExtensionMessage='This is Not an Valid image please select .png or .jpg file';
                  console.log(event.target.files[0]);
              }


          }

      }if(fileSize > 1000000){
          // document.getElementById('secondForm').reset();
          // event.target.files[0]='';

          this.fileExtensionError = true;
          this.fileExtensionMessage='';
          this.fileExtensionMessage='Maximum image size is : 1MB';
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
  constructor(router: Router, private authService: AuthService,private exchangerService: ExchangerService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService ) { 
    this.exchangerService.getKyc("a")
    this.router = router;
    this.steps = [
        { name: 'Personal Information',describ:'ثبت خرید', icon: 'fa-user', active: false, valid: false, hasError: false },
          {name: 'Start ID Verification',describ:'اطلاعات کاربر', icon: 'fa-check', active: true, valid: true, hasError:false },



    ]


    this.search = this.formBuilder.group({
      'userNum':['']
    })
    this.userNum = this.search.controls['userNum'];
    this.personalForm = this.formBuilder.group({

        'amount': ['', Validators.required],
        'receipt': [''],
        'comment':['']

    });

  }
  Search(value:Object){
    this.exchangerService.getKyc(this.search.controls['userNum'].value).subscribe(data=>{
      console.log(data);
      let msg = data['msg'];
      let success = data['success'];
      this.user = data['user']
      if (success) {
        this.flashMessage.show(msg, { cssClass: 'alert-success', timeout: 10000 });
        this.dataSuccess = true;
        this.dataMsg = msg;
        this.firstName = this.user.firstName;
        this.lastname = this.user.lastName;
        this.address = this.user.address;
        this.email = this.user.email;
        this.passImg = this.user.passportImageAddress;
        this.telephone = this.user.telephone;
        this.walletAddress =this.user.walletAddress;
        this.userNumber = this.search.controls['userNum'].value
        
        //   this.router.navigate(['/login']);
    } if(!success) {
        this.flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 10000 });
        this.dataSuccess = false;
        this.dataMsg = msg;
        //   this.router.navigate(['/register']);
    }
    })
    
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')) ;
    this.exchangerService.getList().subscribe(data=>{
        this.receipts= data['receipts']
        this.receipts.forEach(i => {
            console.log(i.exchangerSubmitDate);
            
            i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
        });
        
    })
    if (this.reseted) {
        user.KYCVerified = false;
       
    } else if (user.KYCVerified) {
        this.KYCVerified=true;
        this.firstName = user.firstName;
        this.lastname = user.lastName;
        this.address = user.address;
        this.email = user.email;
        this.passImg = user.passportImageAddress;
        this.telephone = user.telephone;
        this.walletAddress =user.walletAddress;
    }

  }

  public next() {        

    let personalForm = this.personalForm;

  if (personalForm.valid) {
    this.haveImg=false; 
  }

    if (this.steps[this.steps.length - 2].active)
        return false;

    this.steps.some(function (step, index, steps) {

        if (index > steps.length - 2) {
            if (step.active) {
                if(step.name=='Start ID Verification'){

                        step.active = false;
                        step.valid = true;
                        steps[index-1].active=true;
                        return true;
                     
                }
                if (step.name == 'Personal Information') {
                    if (personalForm.valid) {
                        step.active = false;
                        step.valid = true;
                        steps[index - 1].active = true;
                        return true;
                    }
                    else {
                        step.hasError = true;
                    }
                }

            }
        }
    });


}
public prev() {
  if (this.steps[1].active)
      return false;
  this.steps.some(function (step, index, steps) {
      if (index != 2) {
          if (step.active) {
              step.active = false;
              steps[index + 1].active = true;
              return true;
          }
      }
  });
}

public confirm() {
    this.details.amount = this.personalForm.controls['amount'].value;
    this.details.receipt = this.ax;
    this.details.comment =this.personalForm.controls['comment'].value;
    this.details.userNumber = this.userNumber;
    let personalForm = this.personalForm;
    if (!personalForm.valid) {

        return false;
    }
    if (!this.haveImg) {
        this.personalForm.controls['receipt'].setErrors({'required': true});
        return false
    }
  this.steps.forEach(step => step.valid = true);

  console.log(this.userNumber);

  this.exchangerService.receipt(this.details)
  .subscribe(data => {
      console.log(data);
      
      let msg = data['msg'];
      let success = data['success'];

      if (success) {
          this.flashMessage.show(msg, { cssClass: 'alert-success', timeout: 3000 });
          this.dataSuccess = true;
          this.dataMsg = msg;
          this.confirmed = true;

      } else {
          this.flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 3000 });
          this.dataSuccess = false;
          this.dataMsg = msg;

      }
  });

}
public home(){
    location.reload()
}

}
