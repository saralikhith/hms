import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { emergencymodel } from 'src/app/models/emergency';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent implements OnInit{
  constructor(private ad:AdminService){

  }
  emergencyObj:emergencymodel[]=[]
  ngOnInit(): void {
         this.ad.getEmergencyAppointments().subscribe(
          {
            next:res=>{
               if(res.message=="Success"){
                   this.emergencyObj=res.appointments
                  
               }
            },
            error:err=>{
              console.log(err)
            }
          }
         )
      }
}
