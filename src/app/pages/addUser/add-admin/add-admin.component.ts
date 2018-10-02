import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AdminsService } from "../../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAdminComponent implements OnInit {
  public addAdminForm: FormGroup;
  ax;
  photo;
  roles=[];
  success=false;
  err=false;
  msg
  public details: any = {};
  constructor( private adminService: AdminsService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService) {
    this.addAdminForm = this.formBuilder.group({
      'email': ['',Validators.compose([Validators.required, CustomValidators.email])],
      'firstname': ['',Validators.required],
      'lastname': ['',Validators.required],
      'img': ['',Validators.required],
      'roles':['']
    });
   }

  ngOnInit() {
  }
  onClick(evnt){
    this.roles.push(evnt.target.value)
    
  }
  submit(){
    this.details.firstName = this.addAdminForm.value.firstname;
    this.details.lastName = this.addAdminForm.value.lastname;
    this.details.email = this.addAdminForm.value.email;
    this.details.roles = this.roles;
    this.details.image = this.ax;
    this.adminService.registerAdmin(this.details).subscribe(data=>{
      console.log(data);
      this.msg = data['msg'];
      let success = data['success'];
      if (success) {
        this.success = true;
      }
      if (!success) {
        this.err = true;
      }
      
    })
    

  }
  PersonImage(event) {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
        console.log(fileType);


    if (fileType !='image/png') {
        if (fileType !='image/jpg') {
            if (fileType != 'image/jpeg') {
                // document.getElementById('secondForm').reset();
                // document.getElementById('imginput').value =''

                console.log(event.target.files[0]);
            }


        }

    }if(fileSize > 1000000){
        // document.getElementById('secondForm').reset();
        // event.target.files[0]='';


    }
    else{
        console.log(event.target.files[0]);
        this.ax =event.target.files[0];

        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = () => {
            this.photo = reader.result;
        }
        reader.readAsDataURL(file);  

    }
    

}

}
