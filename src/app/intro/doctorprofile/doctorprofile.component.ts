import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { doctorsmodel } from 'src/app/models/doctors';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent {
   constructor(public ad:AdminService){
     
   }
   doctorObj=<doctorsmodel>{}
   
}
