import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RpcService } from "./../../services/rpc.service";
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	EuroData=[];
	EtherData=[];
	chartEu;
	chartEth;
	constructor(private rpcService:RpcService){
		this.rpcService.getPrice({'type':'Euro'});

		
		this.rpcService.getPrice({'type':'Euro'}).subscribe(data=>{

			
			let prices = data['prices']

			prices.forEach(element => {
				this.EuroData.push({
					x:  element.date,
					y: element.price.toString()
				});

			});
			 	
			this.chartEu.update();		
			
			
		});
		this.rpcService.getPrice({'type':'Ether'}).subscribe(data=>{

			
			let prices = data['prices']

			prices.forEach(element => {
				this.EtherData.push({
					x:  element.date,
					y: element.price.toString()
				});

			});
			 	
			this.chartEth.update();		
			
			
		});
	}

	ngOnInit() {


		console.log(this.EuroData);
		

    this.chartEu = new Chart('canvas',{
      type: 'line',
	  data: {
		   datasets: [{
				label: 'Price',
				backgroundColor: "rgb(75, 192, 192)",
				borderColor: "rgb(75, 192, 192)",
				fill: false,
				data: this.EuroData
		   }]
	  },
			options: {
				responsive: true,
				title: {
					 display: true,
					 text: 'قیمت به یورو'
				},
				scales: {
					 xAxes: [{
						  type: 'time',
						  display: true,
						  scaleLabel: {
							   display: true,
							   labelString: 'Date'
						  },
						  ticks: {
							   major: {
									fontStyle: 'bold',
									fontColor: '#FF0000'
							   }
						  }
					 }],
					 yAxes: [{
						  display: true,
						  scaleLabel: {
							   display: true,
							   labelString: 'value'
						  }
					 }]
				}
		   }
			
	});
	
	this.chartEth = new Chart('canvas2',{
		type: 'line',
		data: {
			 datasets: [{
				  label: 'Price',
				  backgroundColor: " #c99d66",
				  borderColor: " #c99d66",
				  fill: false,
				  data: this.EtherData
			 }]
		},
			  options: {
				  responsive: true,
				  title: {
					   display: true,
					   text: 'قیمت به اتریوم'
				  },
				  scales: {
					   xAxes: [{
							type: 'time',
							display: true,
							scaleLabel: {
								 display: true,
								 labelString: 'Date'
							},
							ticks: {
								 major: {
									  fontStyle: 'bold',
									  fontColor: '#FF0000'
								 }
							}
					   }],
					   yAxes: [{
							display: true,
							scaleLabel: {
								 display: true,
								 labelString: 'value'
							}
					   }]
				  }
			 }
			  
	  });
      }

}
