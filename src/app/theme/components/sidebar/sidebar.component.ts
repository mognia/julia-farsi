import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidebarComponent implements OnInit {  
  public settings: Settings;
  public menuItems:Array<any>;
  constructor(public appSettings:AppSettings, public menuService:MenuService) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getVerticalMenuItems();
  }

  ngOnInit() {     
    // if(sessionStorage["userMenuItems"]) {
    //   let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
    //   let newArr = [];
    //   ids.forEach(id => {
    //     let newMenuItem = this.menuItems.filter(mail => mail.id == id);
    //     newArr.push(newMenuItem[0]);
    //   });
    //   this.menuItems = newArr; 
    // }
          // let ids = JSON.parse(sessionStorage.getItem("roles"));
          let newArr = [];
          // console.log(this.menuItems[0].guard);
          //getting roles from local Storage
          const roles = localStorage.getItem('roles');
          //its saved as string so we parse it to json again
          const role = JSON.parse(roles)
          //here we extract the Role Title from role Object
          const roleTitle = role[0].roleTitle

          let isAdmin = this.IsAdmin(roleTitle);
          let isUser = this.IsUser(roleTitle); 
          let isExchanger = this.isExchanger(roleTitle); 
          if (isAdmin) {
            
            for (const item in this.menuItems) {
              let newMenuItem = this.menuItems.filter(item => item.guard == 'admin'||item.guard == 'any')
    
            newArr.push(newMenuItem[0]);
            this.menuItems = newMenuItem; 
            }
          }
          else if (isUser) {
            for (const item in this.menuItems) {
              let newMenuItem = this.menuItems.filter(item => item.guard == 'user'||item.guard == 'any')
    
            newArr.push(newMenuItem[0]);
            this.menuItems = newMenuItem; 
            }
                 
          }else if(isExchanger){
            for (const item in this.menuItems) {
              let newMenuItem = this.menuItems.filter(item => item.guard == 'exchanger'||item.guard == 'any')
    
            newArr.push(newMenuItem[0]);
            this.menuItems = newMenuItem; 
            }
          }
  
        }
        IsAdmin(roleTitle) {
        
          let adminAccess = document.querySelector('#admin');
          if (roleTitle == 'admin') {
            return true
          }
          else {
            return false
          }
        }
        IsUser(roleTitle) {
          if (roleTitle == 'user') {
            return true
          }
          else {
            return false
          }
        }
        isExchanger(roleTitle){

          
          if (roleTitle == 'exchanger') {
            return true
          }
          else {
            return false
          }
        }

  public closeSubMenus(){
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
        let child = menu.children[i].children[1]; 
        if(child){
            if(child.classList.contains('show')){
              child.classList.remove('show');
              menu.children[i].children[0].classList.add('collapsed'); 
            }             
        }
    }
  }


}
