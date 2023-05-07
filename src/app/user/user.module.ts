import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';
import { EmergencyappointmentsComponent } from './emergencyappointments/emergencyappointments.component';
import { IntroModule } from '../intro/intro.module';


@NgModule({
  declarations: [
    UserComponent,
    UserprofileComponent,
    AppointmentComponent,
    EditProfileComponent,
    MyappointmentsComponent,
    EmergencyappointmentsComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    IntroModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
