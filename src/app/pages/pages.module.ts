import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
suppressScrollX: true
};

import { 
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatDialogModule,
    MatChipsModule,
    MatSlideToggleModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatCardModule, 
    MatListModule,
    MatStepperModule
} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
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
import { UsersListComponent } from './users-list/users-list.component';
import {
    ExchangerUserListComponent,
    ExchangeVerificationComponent
} from './exchanger-user-list/exchanger-user-list.component';
import { UserInfoComponent }  from './exchanger-user-list/user-info/user-info.component';
import { UserReceiptComponent }  from './exchanger-user-list/user-receipt/user-receipt.component';
import { AminBuysComponent } from './amin-buys/amin-buys.component';
import { UserBurnComponent } from './user-burn/user-burn.component';
import { AdminBurnComponent } from './admin-burn/admin-burn.component';
import { AddAdminComponent } from './addUser/add-admin/add-admin.component';
import { AddExchangerComponent } from './addUser/add-exchanger/add-exchanger.component';
import { UserBuyComponent } from './user-buy/user-buy.component';
import { UserBuyHistoryComponent } from "./user-buy-history/user-buy-history.component";
import { ExchangerDetailsComponent } from './exchanger-details/exchanger-details.component';
import { UserBurnHistoryComponent } from './user-burn-history/user-burn-history.component';
import { ExchangerHistoryListComponent } from './exchanger-history-list/exchanger-history-list.component';

@NgModule({
    imports: [
        MatProgressBarModule,
        MatChipsModule,
        MatSlideToggleModule, 
        MatIconModule, 
        MatToolbarModule, 
        MatCardModule, 
        MatListModule,
        MatButtonModule, 
        MatCheckboxModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatStepperModule,
        MatDialogModule,
        NgxDatatableModule,
        MatSnackBarModule,
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
        ExchangerUserListComponent,  
        ExchangeVerificationComponent,  
        AminBuysComponent,
        UserBurnComponent,    
        AdminBurnComponent,
        AddAdminComponent,
        AddExchangerComponent,
        UserBuyComponent,
        UserBuyHistoryComponent,
        UserInfoComponent,
        UserReceiptComponent,
        ExchangerDetailsComponent,
        UserBurnHistoryComponent,
        ExchangerHistoryListComponent,
    ],
    entryComponents: [
        ExchangerUserListComponent,
        ExchangeVerificationComponent
    ],
    providers:[
        {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class PagesModule { }
