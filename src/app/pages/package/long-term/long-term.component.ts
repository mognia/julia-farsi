import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-long-term',
  templateUrl: './long-term.component.html',
  styleUrls: ['./long-term.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LongTermComponent implements OnInit {
  accept =false;
  KYCVerified:boolean=false;
  err=false;
  success;
  successMsg;
  errMsg;
  havPack=false;
  public router: Router;
  authService:AuthService;
  constructor(authService:AuthService,router: Router,private flashMessage: FlashMessagesService) {
    this.router = router;
    this.authService = authService;
   }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')) ;
    if (user.KYCVerified) {
      this.KYCVerified = true;
    }
    if (user.SignedContract) {
      if (user.contractType == 'Normal') {
        console.log('its normaaaal');
        this.havPack = true;
      } else if (user.contractType == 'Risky') {
        console.log('its riskyyyyy');
      }

    }

    
  }
  handleChange(evt) {
    this.accept=true
  }
  gotoKyc(){
    this.router.navigate(['pages/form-elements/UserKYC']);
    location.reload()
  }
  buy(){
    
    this.authService.signContract({'contractType':'Normal'})
    .subscribe(data=>{
      console.log(data);
      
      let msg = data['msg'];
      this.errMsg = msg;
      let success = data['success'];
      if(success) {
        this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 10000});
        this.success = true;

      } else {
        this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 3000});
        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
    });
  }
}
