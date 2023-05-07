import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingComponent } from './pending/pending.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { AdddoctorComponent } from './adddoctor/adddoctor.component';
import { AllappointmentsComponent } from './allappointments/allappointments.component';
import { IntroModule } from '../intro/intro.module';
import { EmergencyComponent } from './emergency/emergency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../header.interceptor';
import { AuthorizationInterceptor } from '../authorization.interceptor';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PendingComponent,
    CompletedComponent,
    CancelledComponent,
    AdddoctorComponent,
    AllappointmentsComponent,
    EmergencyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IntroModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HeaderInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthorizationInterceptor,multi:true}],
})
export class AdminModule { }
