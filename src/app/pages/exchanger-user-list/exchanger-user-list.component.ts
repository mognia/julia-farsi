import { Component, OnInit, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { ExchangerService } from "../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
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
  public accountForm: FormGroup;
  public personalForm: FormGroup;
  public search : FormGroup;
  public AddressForm: FormGroup;
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
  //
  haveImg:boolean=true;
  ax;
  photoName: any;
  photoContent: any;
  fileExtension: any;
   fileExtensionError: boolean ;
   validAddress:boolean =true;
  fileExtensionMessage: any;

  dateFormControl = new FormControl('', [
      Validators.required,
  ]);
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
    this.exchangerService.receipt("a")
    this.router = router;
    this.steps = [
        { name: 'Confirm Your Details',describ:'تایید اطلاعات', icon: 'fa-check-square-o', active: false, valid: false, hasError: false },
        { name: 'Address Information',describ:'آدرس و عکس پاسپورت', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
        { name: 'Personal Information',describ:'اطلاعات شخصی', icon: 'fa-user', active: false, valid: false, hasError: false },
          {name: 'Start ID Verification',describ:'اطلاعات کاربر', icon: 'fa-check', active: true, valid: true, hasError:false },



    ]

    this.accountForm = this.formBuilder.group({
   
    });
    this.search = this.formBuilder.group({
      'userNum':['']
    })
    this.userNum = this.search.controls['userNum'];
    this.personalForm = this.formBuilder.group({

        'firstname': ['', Validators.required],
        'lastname': ['', Validators.required],
        'birth': ['', Validators.required],

        'phone': ['', Validators.required],
        'wallet': ['',Validators.required],

    });
    this.AddressForm = this.formBuilder.group({
        'address': ['', Validators.required],
        'image': ['']
    });
  }
  Search(value:Object){
    this.exchangerService.receipt(this.search.controls['userNum'].value).subscribe(data=>{
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
        
        //   this.router.navigate(['/login']);
    } else {
        this.flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 10000 });
        this.dataSuccess = false;
        this.dataMsg = msg;
        //   this.router.navigate(['/register']);
    }
    })
    
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')) ;

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

    let accountForm = this.accountForm;
    let personalForm = this.personalForm;
    let AddressForm = this.AddressForm;
  if (personalForm.valid) {
    this.haveImg=false; 
  }

    if (this.steps[this.steps.length - 4].active)
        return false;

    this.steps.some(function (step, index, steps) {

        if (index > steps.length - 4) {
            if (step.active) {
                if(step.name=='Start ID Verification'){
                    if (accountForm.valid) {
                        step.active = false;
                        step.valid = true;
                        steps[index-1].active=true;
                        return true;
                    }
                    else{
                        step.hasError = true;
                    }                      
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
                if (step.name == 'Address Information') {
                    

                            if (AddressForm.valid) {
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


    this.details.firstname = this.personalForm.value.firstname;
    this.details.lastname = this.personalForm.value.lastname;
    this.details.birth = this.personalForm.value.birth;
    this.details.email = this.personalForm.value.email;
    this.details.phone = this.personalForm.value.phone;
    this.details.wallet = this.personalForm.value.wallet;
    this.details.address = this.AddressForm.value.address;
    this.details.image = this.ax;
}
public prev() {
  if (this.steps[3].active)
      return false;
  this.steps.some(function (step, index, steps) {
      if (index != 4) {
          if (step.active) {
              step.active = false;
              steps[index + 1].active = true;
              return true;
          }
      }
  });
}

public confirm() {
  this.steps.forEach(step => step.valid = true);
  this.confirmed = true;
  // console.log(this.details);

  this.authService.updatekyc(this.details).subscribe(data => {
      let msg = data['msg'];
      let success = data['success'];

      if (success) {
          this.flashMessage.show(msg, { cssClass: 'alert-success', timeout: 3000 });
          this.dataSuccess = true;
          this.dataMsg = msg;
          //   this.router.navigate(['/login']);
      } else {
          this.flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 3000 });
          this.dataSuccess = false;
          this.dataMsg = msg;
          //   this.router.navigate(['/register']);
      }
  });

}
public home(){
    this.router.navigate(['pages/dashboard']);
}

}
