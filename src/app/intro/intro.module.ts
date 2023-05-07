import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IntroRoutingModule } from './intro-routing.module';
import { IntroComponent } from './intro.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PasswordMatchDirective } from 'src/passwordmatch.directive';
import { DoctorComponent } from './doctor/doctor.component';
import { SearchPipe } from './search.pipe';
import { ContactComponent } from './contact/contact.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppModule } from '../app.module';
import { FooterComponent } from './footer/footer.component';
import { SortPipe } from './sort.pipe';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';


@NgModule({
  declarations: [
    IntroComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PasswordMatchDirective,
    DoctorComponent,
    SearchPipe,
    ContactComponent,
    FooterComponent,
    SortPipe,
    DoctorprofileComponent,

  ],
  imports: [
    CommonModule,
    IntroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  
  ],
  exports:[
    HomeComponent,
    DoctorComponent,
    SearchPipe,
    SortPipe,
    ContactComponent,
    DoctorprofileComponent
  ]
  
})
export class IntroModule { }
