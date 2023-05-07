import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderInterceptor } from './header.interceptor';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';



@NgModule({
  declarations: [
    AppComponent,

    PagenotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],

  providers: [{provide:HTTP_INTERCEPTORS,useClass:HeaderInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthorizationInterceptor,multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
