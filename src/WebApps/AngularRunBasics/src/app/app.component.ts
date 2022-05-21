 import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { MembersService } from './_services/members.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = "NewDatingApp";
  public users?: any;

  constructor(public oidcSecurityService: OidcSecurityService,private accountService: AccountService, private http: HttpClient) {
   
  }

   
  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
      if (!isAuthenticated)
        this.oidcSecurityService.authorize();
      console.log(userData)
    });
   // this.getUsers();
    this.setCurrentUser();
  }
 
 
  setCurrentUser() {
    //var storageData = localStorage.getItem('user');
    //const user: User = !!storageData ? JSON.parse(storageData || '{}') : null ;
    const user: User = JSON.parse(localStorage.getItem('user')) ;
    if (user) {

      this.accountService.setCurrentUser(user);

      //this.presence.createHubConnection(user);

    }


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



