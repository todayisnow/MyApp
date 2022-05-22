import { Component, OnInit } from '@angular/core';
import { AccountService } from "../_services/account.service";
import { Router } from "@angular/router";
import { ToastrService} from 'ngx-toastr'
import { filter, Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

//import { MembersService } from "../_services/members.service";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
/** nav component*/
export class NavComponent implements OnInit {

  model: any = {}
 

  constructor(public oidcSecurityService: OidcSecurityService,public accountService: AccountService, private router: Router, private toastr: ToastrService)//account is public to be access to templte {html}
  {
    
    }
  ngOnInit(): void {
   
    }
 
  
  logout() {
    localStorage.removeItem('user');

    
    this.oidcSecurityService.logoff();
  }

  
}
