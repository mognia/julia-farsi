import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'داشبورد', '/pages/dashboard', null, 'tachometer', null, false, 0,'any'),

    new Menu (3, 'احراز هویت کاربر', '/pages/form-elements/UserKYC', null, 'magic', null, false, 0,'user'),
    new Menu (4, 'تیکت', '/pages/ticketing/UserTicket', null, 'magic', null, false, 0,'user'),
    new Menu (5, 'احراز هویت ادمین', '/pages/form-elements/AdminKYC', null, 'caret-right', null, false, 0,'admin'),
    new Menu (6, 'تیکت', '/pages/ticketing/AdminTicket', null, 'caret-right', null, false, 0,'admin'),
    new Menu (7, 'پکیج ها', null, null, 'caret-right', null, true, 0,'user'),
    new Menu (8, 'بلند مدت', '/pages/package/LongTerm', null, 'keyboard-o', null, false, 7,'user'),
    new Menu (9, 'کوتاه مدت', '/pages/package/ShortTerm', null, 'keyboard-o', null, false, 7,'user'),
    new Menu (10, 'تغییر دسترسی', '/pages/ChangeRole', null, 'caret-right', null, false, 0,'admin'),
    new Menu (11, 'ریفرال', '/pages/referal', null, 'keyboard-o', null, false, 0,'user'),
    new Menu (12, 'لیست کاربران', '/pages/UserList', null, 'caret-right', null, false, 0,'admin'),
    // new Menu (30, 'NGX DataTable', '/pages/tables/dynamic-tables/ngx', null, 'caret-right', null, false, 28,'admin'), 
]

