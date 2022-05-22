import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { HttpClient } from "@angular/common/http";
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { OrderService } from '../_services/order.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
/** home component*/
export class HomeComponent implements OnInit {
  /** home ctor */
  FetchMode = false;
  myToken: string;
  orders: any[]
  constructor(public oidcSecurityService: OidcSecurityService, private orderService:  OrderService) {

  }
  ngOnInit(): void {
    
    
    
    
    }
  

  FetchData() {
    this.FetchMode = true;
    const myObserver = {
      next: (items) => {
        console.log(items); this.orders = items
      },
      error: (err) => console.log('err: ', err),
      complete: () => console.log("Observable completed")
    };
    this.oidcSecurityService.getAccessToken().subscribe(
      (res) => {
        this.myToken = res;

      });
       this.orderService.getOrders().subscribe(myObserver);
  }
}
