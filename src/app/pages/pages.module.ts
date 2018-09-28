import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { PipesModule } from '../theme/pipes/pipes.module';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';

import { HeaderComponent } from '../theme/components/header/header.component';
import { FooterComponent } from '../theme/components/footer/footer.component';
import { SidebarComponent } from '../theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from '../theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from '../theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from '../theme/components/back-top/back-top.component';
import { FullScreenComponent } from '../theme/components/fullscreen/fullscreen.component';


import { UserMenuComponent } from '../theme/components/user-menu/user-menu.component';





import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReferalComponent } from './referal/referal.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { UsersListComponent } from './users-list/users-list.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ExchangerUserListComponent } from './exchanger-user-list/exchanger-user-list.component';
import { CompeletUserBuyComponent } from './compelet-user-buy/compelet-user-buy.component';
import { AminBuysComponent } from './amin-buys/amin-buys.component';



@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,MatExpansionModule,MatDatepickerModule,
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FlashMessagesModule.forRoot(),
    ToastrModule.forRoot(), 
    NgbModule.forRoot(),
    MultiselectDropdownModule,
    PipesModule,
    routing
  ],
  declarations: [
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    FullScreenComponent,


    UserMenuComponent,
 


    AdminUserListComponent,
    ReferalComponent,
    ResetPassComponent,
    
    UsersListComponent,
    
    WithdrawComponent,
    
    ExchangerUserListComponent,
    
    CompeletUserBuyComponent,
    
    AminBuysComponent,


  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class PagesModule { }
