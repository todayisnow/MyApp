import { Component, OnInit } from '@angular/core';
import { AccountService } from "../_services/account.service";
import { Router } from "@angular/router";
import { ToastrService} from 'ngx-toastr'
import { filter, Observable } from 'rxjs';
import { User } from '../_models/user';
import { MembersService } from '../_services/members.service';
//import { MembersService } from "../_services/members.service";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
/** nav component*/
export class NavComponent implements OnInit {
  /** nav ctor */
  model: any = {}
 
  /*currentUser$: Observable<User>;*/
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService//,
   /* private membersService:MembersService*/)//account is public to be access to templte {html}
   {
    
    }
  ngOnInit(): void {
    //this.currentUser$ = this.accountService.currentUser$;
    }
  login() {
   
    this.accountService.login(this.model).subscribe(
      {
        next: () => {

          this.router.navigateByUrl('/members');
          this.toastr.success("Logged In");
        }
         
        
      });
    
  }
  logout() {
    this.accountService.logout();
    

    //this.membersService.resetMemberCache();
    this.router.navigateByUrl('/');


  }
  //getCurrentUser() {
  
  //  console.log("startcur")
  //  this.accountService.currentUser$ // this not http it wont compete so we use async pipe insted
  //  .subscribe({
  //    next: (user) => this.loggedIn = !!user,
  //    error: (err: Error) => console.log(err)
  //  })
  //}
  
}
