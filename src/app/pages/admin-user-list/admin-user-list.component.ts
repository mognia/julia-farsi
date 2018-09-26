import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUserListComponent implements OnInit {
  public router: Router;
  editing = {};
  public form:FormGroup;
  public user:AbstractControl;
  public exchanger:AbstractControl;
  public canChangeRoles:AbstractControl;
  public canVerifyKYC:AbstractControl;
  public email:AbstractControl;
  // rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = false;
  reorderable: boolean = true;
  rows:any = [];
   roles;
  columns = [
    { prop: 'email' },
    { name: 'roles' },

  ];
  
  @ViewChild(DatatableComponent) table: DatatableComponent;



  constructor(router:Router, private authService:AuthService,private flashMessage: FlashMessagesService,fb:FormBuilder,) { 
    this.form = fb.group({
      user: [true],
      exchanger: [false],
      canChangeRoles: [false],
      canVerifyKYC:[false],
      email:['']
  });
  this.authService.getUserList();
  this.user = this.form.controls['user'];
  this.exchanger = this.form.controls['exchanger'];
  this.canChangeRoles = this.form.controls['canChangeRoles'];
  this.canVerifyKYC = this.form.controls['canVerifyKYC'];
  this.email = this.form.controls['email'];
    this.authService.getUserList().subscribe(data => {

      let users = data['users']
      users.forEach(user => {
        var roleStr = ""
        user.roles.forEach(a => {
          roleStr += a.roleTitle + " ,";
          
        });
        user.roles = roleStr.slice(0,-2);
      });
      this.rows=users
      this. rows.forEach(user=>{
        this.temp.push(user);
        
      })


    });
  }
  public onSubmit(values:Object):void {
    values["email"] =this.selected[0].email;
    console.log(values);
    this.authService.changeRole(values).subscribe(data => {
      console.log(data);
      let msg = data['msg'];
      let success = data['success'];
      if(success) {
        this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 3000});
        location.reload();
      } else {
        this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    
    
  }
  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

      // console.log(this.temp);
      
    const temp = this.temp.filter(function(d) {
console.log(d);

      
      return d.email.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  onSelect({ selected }) {
    this.selected=[]
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


  ngOnInit() {
  }

}
