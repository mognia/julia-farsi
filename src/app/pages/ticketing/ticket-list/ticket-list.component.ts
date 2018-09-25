import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TicketService } from "../../../services/ticket.service";
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TicketListComponent implements OnInit {
  public router: Router;
  public form:FormGroup;
  public replayDesc:AbstractControl;
   current;
   ticketsArr=[];
   replays;
   description;
   attachmentAddress;

  constructor(private activatedRoute: ActivatedRoute,router:Router, private ticketService: TicketService,fb:FormBuilder,private flashMessage: FlashMessagesService) {
    this.router = router;
    this.ticketService.listmy();
    this.form = fb.group({
      replayDesc: [''],
  });
  this.replayDesc = this.form.controls['replayDesc'];
   }

  ngOnInit() {
    // const user = localStorage.getItem('user');
    // const ParsedUser =  JSON.parse(user);

    // this.userEmail = ParsedUser.email;


   this.current = this.ticketService.GetCurrentTicket();
   this.ticketService.listmy().subscribe(data=>{
    let tickets = data['tickets'];
    console.log(data);
    tickets.forEach(ticket => {
      this.ticketsArr.push(ticket);
    });
    this.ticketsArr.forEach(i => {
      if (i.ticketNumber == this.current) {
        console.log(i);
        this.replays = i.replays;
        this.description = i.description;
        this.attachmentAddress = i.attachmentAddress;
      }
    });
    console.log(this.description);
    // this.replays.forEach(rep=>{
    //   if (rep.userEmail = this.userEmail) {
    //     this.sameMail=true;
        
    //   }
    // })
  })
   
  }
  public onSubmit(values:Object) {
    values['ticketNumber'] = this.current
    this.ticketService.replay(values).subscribe(data=>{
      let success = data['success'];
      let msg = data['msg'];
      if(success) {
        this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['pages/ticketing/UserTicket']);
      } else {
        this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 5000});

      }
      
    })
    
  }

}
