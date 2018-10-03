import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';


import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { ReferalComponent } from './referal/referal.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

import { UsersListComponent } from './users-list/users-list.component';
import { UserBurnComponent } from './user-burn/user-burn.component';
import { ExchangerUserListComponent } from './exchanger-user-list/exchanger-user-list.component';

import { AminBuysComponent } from './amin-buys/amin-buys.component';
import { AdminBurnComponent } from './admin-burn/admin-burn.component';
import { AddAdminComponent } from './addUser/add-admin/add-admin.component';
import { AddExchangerComponent } from './addUser/add-exchanger/add-exchanger.component';
import { UserBuyComponent } from './user-buy/user-buy.component';
export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'dashboard', pathMatch:'full' },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },          
          

            { path: 'form-elements', loadChildren: 'app/pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
            { path: 'package', loadChildren: 'app/pages/package/package.module#PackageModule', data: { breadcrumb: 'Packages' } },
            { path: 'ChangeRole', component:AdminUserListComponent, data: { breadcrumb: 'Change Role' } },
            { path: 'UserList', component:UsersListComponent, data: { breadcrumb: 'Users List' } },
            { path: 'referal', component:ReferalComponent, data: { breadcrumb: 'Referals' } },
            { path: 'UserBuy', component:UserBuyComponent, data: { breadcrumb: 'user Burn' } }, 
            { path: 'UserBurn', component:UserBurnComponent, data: { breadcrumb: 'user Burn' } },  
            { path: 'adminBuys', component:AminBuysComponent, data: { breadcrumb: 'Admin Buys' } }, 
            { path: 'adminBurn', component:AdminBurnComponent, data: { breadcrumb: 'Admin Buys' } }, 
            { path: 'ExchangerUserList', component:ExchangerUserListComponent, data: { breadcrumb: 'Exchanger User List' } },
            { path: 'resetPass', component:ResetPassComponent, data: { breadcrumb: 'Reset Password' } },             
            { path: 'ticketing', loadChildren: 'app/pages/ticketing/ticketing.module#TicketingModule', data: { breadcrumb: 'Ticketing' } },
            { path: 'addAdmin', component:AddAdminComponent, data: { breadcrumb: 'Reset Password' } },   
            { path: 'addExchanger', component:AddExchangerComponent, data: { breadcrumb: 'Reset Password' } },   

       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);