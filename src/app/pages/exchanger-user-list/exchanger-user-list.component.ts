import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ExchangerService } from '../../services/exchanger.service';
import { UserInfo, UserReceipt } from '../../models/user';

@Component({
    selector: 'app-exchanger-user-list',
    templateUrl: './exchanger-user-list.component.html',
    styleUrls: ['./exchanger-user-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExchangerUserListComponent implements OnInit {
    
    receipts: UserReceipt[];
    Columns: string[] = ['receiptNumber', 'userEmail', 'amount', 'verificationCode', 'codeExpiration', 'status', 'view']
    displayedColumns: string[] = ['شماره رسید', 'ایمیل', 'میزان سرمایه گذاری', 'کد پیرگیری', 'تاریخ انقضا', 'وضعیت', 'مشاهده']
    dataSource = new MatTableDataSource<UserReceipt>(this.receipts);

    user: UserInfo;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private exchangerService: ExchangerService, 
        public snackBar: MatSnackBar,
        public dialog: MatDialog) {}
    
    ngOnInit() {
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.verificationCode.toLowerCase().includes(filter);
        };

        this.exchangerService.getList()
        .subscribe(receipts => {
            this.receipts = this.initializeReceiptItems(receipts)
            this.dataSource.data = this.receipts
            console.log(receipts)
        })

    }

    filterReceipts(e) {
        if (e.checked) {
            this.exchangerService.getPendingList()
            .subscribe(receipts => {
                this.receipts = this.initializeReceiptItems(receipts)
                this.dataSource.data = this.receipts
                console.log(receipts)
            })
        } else {
            this.exchangerService.getList()
            .subscribe(receipts => {
                this.receipts = this.initializeReceiptItems(receipts)
                this.dataSource.data = this.receipts
                console.log(receipts)
            })
        }
    }

    initializeReceiptItems(receipts): UserReceipt[] {
        let receipt = receipts.map((receipt: UserReceipt) => { return receipt })
        return receipt
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }

    open() {
        
    }

    openSnackBar(message: string) {
        let verticalPosition: MatSnackBarVerticalPosition = 'top';
        let config = new MatSnackBarConfig()
        config.verticalPosition = verticalPosition
        config.duration = 2000
        this.snackBar.open(message, '', config);
    }

    openStatusDialog(receipt) {
        this.exchangerService.getUser(receipt.userEmail)
        .subscribe(user => {
            this.user = user
            console.log(user)
            const dialogRef = this.dialog.open(ExchangeVerificationComponent, {
                panelClass: 'verification',
                width: '50%', 
                data: {userInfo: user, userReceipt: receipt} });

            dialogRef.afterClosed().subscribe(data => {
                this.openSnackBar(data.msg)
                console.log(data.success)
            })
        })
    }
}

// export interface UserReceipt {
//     status: string;
//     amount: number;
//     userEmail: string;
//     verificationCode: string;
//     codeExpiration: string;
//     receiptNumber: number;
// }

// const INIT_DATA: UserReceipt[] = [
//     {status: "1", amount: 2, userEmail: "user@user.com", verificationCode: "jquery", codeExpiration: "5", receiptNumber: 6},
//     {status: "1", amount: 2, userEmail: "babi@user.com", verificationCode: "html", codeExpiration: "5", receiptNumber: 6},
//     {status: "1", amount: 2, userEmail: "jamshid@user.com", verificationCode: "javascript", codeExpiration: "5", receiptNumber: 6},
//     {status: "1", amount: 2, userEmail: "kamran@user.com", verificationCode: "4", codeExpiration: "5", receiptNumber: 6},
//     {status: "1", amount: 2, userEmail: "jafar@user.com", verificationCode: "4", codeExpiration: "5", receiptNumber: 6},
// ]


/**
 * @title Stepper overview
 */
@Component({
    selector: 'exchanger-verification',
    templateUrl: 'exchanger-verification.html',
    styleUrls: ['exchanger-verification.scss'],
})
export class ExchangeVerificationComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    querySent = false;
    imageSource;
    docImage: AbstractWorker;
    photo: any;


    constructor(
        private exchangeService: ExchangerService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ExchangerUserListComponent>,
        @Inject(MAT_DIALOG_DATA) public user) 
    {
        console.log(this.user)
        this.imageSource = user.userInfo.imageAddress;
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
        });
    }

    changeImageSource() {
        if (this.imageSource == this.user.userInfo.imageAddress) {
            this.imageSource = this.user.userInfo.passportImageAddress;
        } else {
            this.imageSource = this.user.userInfo.imageAddress;
        }
    }

    verifYImage(fileType, fileSize) {
        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg') {
            console.log('invalid file type')
            return null
        } else if (fileSize > 1000000) {
            console.log('too large image')
            return null
        }
        return true
    }

    onSelectFile(event) { 
        if (event.target.files && event.target.files[0]) {
            let fileType = event.target.files[0].type
            let fileSize = event.target.files[0].size

            if (this.verifYImage(fileType, fileSize)) {
                this.docImage = event.target.files[0]
                var reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = () => {
                  this.photo = reader.result;
                }
            }
            
        }
    }

    confirmUser(comment) {
        this.querySent = true;
        let receipt = {
            receiptNumber: this.user.userReceipt.receiptNumber, 
            comment: comment,
            receipt: this.docImage
        }
        this.exchangeService.confirmReceipt(receipt)
        .subscribe(c => {
            console.log(c);
            
            if (c['success']) {
                this.dialogRef.close(c)
            }
        })
    }
}
