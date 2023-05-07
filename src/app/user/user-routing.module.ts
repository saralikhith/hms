import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from '../intro/contact/contact.component';
import { DoctorComponent } from '../intro/doctor/doctor.component';
import { HomeComponent } from '../intro/home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmergencyappointmentsComponent } from './emergencyappointments/emergencyappointments.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';
import { UserComponent } from './user.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [{ path: '', component: UserComponent,children:[
  {path:'userprofile',component:UserprofileComponent},
  {path:'appointment',component:AppointmentComponent},
  {path:'doctor',component:DoctorComponent},
  {path:'help',component:ContactComponent},
  {path:'home',component:HomeComponent},
  {path:'editprofile',component:EditProfileComponent},
  {path:'myappointments',component:MyappointmentsComponent},
  {path:'emergencyappointments',component:EmergencyappointmentsComponent},
  {path:'contactus',component:ContactComponent},

  {path:'',redirectTo:'userprofile',pathMatch:'full'}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
