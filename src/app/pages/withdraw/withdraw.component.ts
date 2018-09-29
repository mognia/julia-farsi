import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { ExchangerService } from "../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WithdrawComponent implements OnInit {
  receipts;
  balance;
  constructor(router: Router, private authService: AuthService,private exchangerService: ExchangerService, private fb: FormBuilder, private flashMessage: FlashMessagesService) { 
    this.authService.listReceipt().subscribe(data=>{
      this.receipts = data['receipts']
      this.receipts.forEach(i => {
        
        i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
    });
      console.log(data);
      
    });
    this.authService.getBalance().subscribe(data=>{
      this.balance = data['balance']

      console.log(data);
      
    });
  }

  ngOnInit() {
  }

}
