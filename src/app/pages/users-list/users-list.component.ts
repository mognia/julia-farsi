import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth-service.service";
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
  public users=[];
  temp = [];
  selectedEmail;
  selectedUserForActivity;
  address;
  email;
  firstName;
  lastname;
  passImg;
  telephone;
  walletAddress;
  birthDate;
  KYCUpdated;
  KYCVerified;
  Msg;
  success;
  err
  public form:FormGroup;
  public disable:AbstractControl;
  public enable:AbstractControl;
  constructor(private fb: FormBuilder,private authService:AuthService) {
    this.form = fb.group({
      disable: [false],
      enable: [false],
  });
   }

  ngOnInit() {
    this.authService.getUserList()
    this.authService.getUserList().subscribe(data => {
      let users = data['users'];

      users.forEach(user => {
        this.users.push(user.email);
        this.temp.push(user.email)
      });
      console.log(this.users);
      
    });
  }
  onSearchChange(searchValue : string){
    let val = searchValue.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.users = temp;
    console.log(temp);
    
  }

  getKyc(email){
    console.log(email);
    this.selectedEmail = email;
    this.authService.getKyc({'email':email}).subscribe(data=>{
    let user= data["user"];
    this.KYCUpdated = user.KYCUpdated;
    this.KYCVerified = user.KYCVerified;
    this.address = user.address;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastname = user.lastName;
    this.passImg = user.passportImageAddress;
    this.telephone = user.telephone;
    this.walletAddress = user.walletAddress;
    this.birthDate = user.birthDate;
      // console.log(user.email);
      
    });
    
  }

  activity(email){
    this.selectedUserForActivity = email;
    console.log(email);
    
  }

  active(){
    this.authService.activeUser({"email":this.selectedUserForActivity}).subscribe(data=>{
      console.log(data);

      let msg = data['msg'];
      this.Msg = msg;
      let success = data['success'];
      if(success) {

        this.success = true;

      } else {

        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
    });
  }
  reload(){
  console.log('reload');
  
  location.reload();
}
  deactive(){
    this.authService.deactiveUser({"email":this.selectedUserForActivity}).subscribe(data=>{
      console.log(data);

      let msg = data['msg'];
      this.Msg = msg;
      let success = data['success'];
      if(success) {

        this.success = true;
        setTimeout(() => {
          location.reload()
      }, 3000);
      } else {

        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
    });
  }

}
