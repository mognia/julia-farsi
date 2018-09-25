import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth-service.service";
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {
  public router: Router;
  constructor(router:Router,private authService:AuthService) { this.router = router;}

  ngOnInit() {
  }
  resetPass(){
    this.router.navigate(['pages/resetPass']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
