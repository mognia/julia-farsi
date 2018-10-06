import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth-service.service";
import * as moment from 'moment';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user-burn-history',
  templateUrl: './user-burn-history.component.html',
  styleUrls: ['./user-burn-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBurnHistoryComponent implements OnInit {
  allBurnRequests;
  displayedColumns: string[] = ['submitDate', 'amount', 'status', 'tokenPrice','reqNum'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  BurnDataSource;
  constructor(private authService: AuthService,) {
    this.authService.listAllBurn().subscribe(data=>{

      
      this.allBurnRequests = data['burnRequest'];
      console.log(data);
      this.BurnDataSource = new MatTableDataSource(this.allBurnRequests);
      this.BurnDataSource.paginator = this.paginator;

      
      this.allBurnRequests.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
      
    });
   }

  ngOnInit() {
  }

  

}
