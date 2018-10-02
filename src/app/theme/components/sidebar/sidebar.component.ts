import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidebarComponent implements OnInit {
  public settings: Settings;
  public menuItems: Array<any>;
  isUser;
  isAdmin;
  isChangeRole;
  isExchanger;
  isVerifyKYC;
  isAnswerTicket;
  constructor(public appSettings: AppSettings, public menuService: MenuService) {
    this.settings = this.appSettings.settings;
    this.menuItems = this.menuService.getVerticalMenuItems();



    
  }

  ngOnInit() {

    let newArr = [];

    const roles = localStorage.getItem('roles');

    const role = JSON.parse(roles)
    console.log(role);
    
    this.isAdmin = this.IsAdmin(role);
    this.isUser = this.IsUser(role)
    console.log(this.isAdmin);
    

    // role.forEach(i => {

    //   this.isUser = this.IsUser(i.roleTitle);
    //   this.isExchanger = this.IsExchanger(i.roleTitle);
    //   this.isVerifyKYC =  this.IsVerifyKYC(i.roleTitle);
    //   this.isChangeRole = this.IsChangeRole(i.roleTitle);
    //   this.isAnswerTicket = this.IsAnswerTicket(i.roleTitle);
    // });





    if (this.isAdmin) {


      
      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'admin' || item.guard == 'any')

        newArr.push(newMenuItem[0]);
        console.log(this.menuItems);
        
       return this.menuItems = newMenuItem;
        
      }
    }
    if (this.isUser) {



      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'user' || item.guard == 'any')

        newArr.push(newMenuItem[0]);
        this.menuItems = newMenuItem;
      }

    } if (this.isExchanger) {


      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'exchanger' || item.guard == 'any')

        
        newArr.push(newMenuItem[0]);
        this.menuItems = newMenuItem;

        
      }

    }
    if (this.isVerifyKYC) {



      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'verifyKYC' || item.guard == 'any')

        newArr.push(newMenuItem[0]);
        this.menuItems = newMenuItem;
      }

    }
    if (this.isChangeRole) {


      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'changeRoles' || item.guard == 'any')

        newArr.push(newMenuItem[0]);
        this.menuItems = newMenuItem;
      }

    }
    if (this.isAnswerTicket) {


      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'answerTicket' || item.guard == 'any')

        newArr.push(newMenuItem[0]);
        this.menuItems = newMenuItem;
      }

    }

  }
  IsAdmin(roleTitle) {

    let adminAccess = document.querySelector('#admin');
    if (roleTitle == 'Admin') {
      return true
    }
    else {
      return false
    }
  }
  IsUser(roleTitle) {


    if (roleTitle == 'User') {
      return true
    }
    else {
      return false
    }
  }
  IsExchanger(roleTitle) {


    if (roleTitle == 'exchanger') {
      return true
    }
    else {
      return false
    }
  }
  IsChangeRole(roleTitle) {
    if (roleTitle == 'changeRoles') {
      return true
    }
    else {
      return false
    }

  }
  IsVerifyKYC(roleTitle) {


    if (roleTitle == 'verifyKYC') {
      return true
    }
    else {
      return false
    }
  }
  IsAnswerTicket(roleTitle) {
    if (roleTitle == 'answerTicket') {
      return true
    }
    else {
      return false
    }
  }

  public closeSubMenus() {
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
      let child = menu.children[i].children[1];
      if (child) {
        if (child.classList.contains('show')) {
          child.classList.remove('show');
          menu.children[i].children[0].classList.add('collapsed');
        }
      }
    }
  }


}