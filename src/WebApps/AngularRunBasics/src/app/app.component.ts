 import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = "Mofa Sample";
  public users?: any;

  constructor(private oidcSecurityService: OidcSecurityService, private http: HttpClient) {
   
  }

   
  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
      if (!isAuthenticated) {
        this.oidcSecurityService.authorize();
        if (userData) {

          localStorage.setItem('user', JSON.stringify(userData));// save user to browser local storage
          
        }
      }
      
    });
  
  }
 
 
  


  


  //private getUsers() {
  //  const myObserver = {
  //    next: (result: any) => this.users = result,
  //    error: (error: Error) => console.error(error),
  //    complete: () => console.log("complete")
  //  };
  //  this.http.get('/api/users').subscribe(myObserver);

      
  //  }
}



