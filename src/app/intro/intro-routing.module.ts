import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'doctor', component: DoctorComponent,children:[
     
      ] },
      {path:'doctorprofile',component:DoctorprofileComponent},
      { path: 'register', component: RegisterComponent },
      { path: 'contact', component:ContactComponent },
      {path:'',redirectTo:'/home',pathMatch:'full'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroRoutingModule {}
