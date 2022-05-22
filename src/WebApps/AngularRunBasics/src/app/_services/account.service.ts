import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';



//import { environment } from "src/environments/environment";
//import { PresenceService } from "./presence.service";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "/api/";// environment.apiUrl;
  private currentUserSource = new ReplaySubject<UserDataResult>();
  // It buffers a set number of values (1) and will emit those values immediately
  // to any new subscribers in addition to emitting new values to existing subscribers.
  //
  // ReplaySubject will block the subscriber waiting for the first value
  // whereas BehaviorSubject requires an initial value when created

  currentUser$ = new ReplaySubject<UserDataResult>();//create observable to subscribe to
  
  constructor(private http: HttpClient, public oidcSecurityService: OidcSecurityService,/*, private presence: PresenceService*/) {
    this.currentUserSource.next(null);
  }

  login() {

   


    
  }


  setCurrentUser(user: UserDataResult) {
    //if (user != null) {
    //  user.roles = [];
    //  const roles = this.getDecodedToken(user.token)?.role;
    //  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);


    //  localStorage.setItem('user', JSON.stringify(user));

      this.currentUserSource.next(user);
    //}
  }

  logout() {
    
    
    //this.presence.stopHubConnection();
  }
  //getDecodedToken(token: string) {
  //  return JSON.parse(atob(token.split('.')[1]));
  //}
}

