import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Directive, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { AppRoutingModule } from './app-routing.module'
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';

import { LoadingInterceptor } from './_interceptors/loading.interceptor';

import { FileUploadModule } from "ng2-file-upload"
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,

    NotFoundComponent,
    ServerErrorComponent,

  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    
    SharedModule,
  
    AuthConfigModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,//to add my custom intercepter to angular interceptors
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true 
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
