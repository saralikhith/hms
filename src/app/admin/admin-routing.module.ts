import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from '../intro/doctor/doctor.component';
import { AdddoctorComponent } from './adddoctor/adddoctor.component';
import { AdminComponent } from './admin.component';
import { AllappointmentsComponent } from './allappointments/allappointments.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { CompletedComponent } from './completed/completed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { PendingComponent } from './pending/pending.component';

const routes: Routes = [{ path: '', component: AdminComponent ,children:[
  {path:'dashboard',component:DashboardComponent},
  {path:'adddoctor',component:AdddoctorComponent},
  {path:'pending',component:PendingComponent},
  {path:'completed',component:CompletedComponent},
  {path:'cancelled',component:CancelledComponent},
  {path:'allappointments',component:AllappointmentsComponent},
  {path:'doctor',component:DoctorComponent},
  {path:'emergency',component:EmergencyComponent},
  {path:'',redirectTo:'dashboard',pathMatch:'full'}
 
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
