import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'https://localhost:44310',
      redirectUrl: 'https://localhost:4200',
      postLogoutRedirectUri: 'https://localhost:4200',
      clientId: 'angularRunBasics-client',
      scope: 'openid profile email address roles OcelotApiGw orderAPI offline_access', // 'openid profile offline_access ' + your scopes
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      
      
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule { }
