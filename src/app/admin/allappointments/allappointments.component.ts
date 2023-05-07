import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { appointmentmodel } from 'src/app/models/appointement';

@Component({
  selector: 'app-allappointments',
  templateUrl: './allappointments.component.html',
  styleUrls: ['./allappointments.component.css']
})
export class AllappointmentsComponent implements OnInit {
 pendingStat:boolean=false
 assignStat:boolean=false
 searchItem:string=''
  allAppoints:appointmentmodel[]=[];
  notAssignedAppointments:appointmentmodel[]=[]
  assignedAppointments:appointmentmodel[]=[]
  value:String='allAppointments'
  constructor(private adminService:AdminService){} 
  obj={
    name:"Apollo"
  }
  ngOnInit(): void {
   
   this.allAppointments()
  }
  allAppointments(){
    this.value='allAppointments'
    this.adminService.getAllAppointments(this.obj).subscribe(res=>{
      console.log(res)
      this.allAppoints=res.appointments;
      this.pendingStat=false
      this.assignStat=false
     })
     
  }
  completed(){
    this.value='completed'
    this.adminService.getCompletedAppointments(this.obj).subscribe(res=>{
      this.allAppoints=res.appointments;
      this.pendingStat=false
      this.assignStat=false
     })
    
  
  }
  assigned(){
    this.allAppoints=this.assignedAppointments
    this.assignStat=false
  }
  notAssigned(){
    this.allAppoints=this.notAssignedAppointments
    this.assignStat=true
  }
  pending(){
    this.value='pending'
    this.adminService.getPendingAppointments(this.obj).subscribe(res=>{
      this.notAssignedAppointments=res.notAssignedAppointments;
      this.assignedAppointments=res.assignedAppointments
      this.pendingStat=true
      this.assignStat=false
     })
  }
  cancelled(){
    this.value='cancelled'
    this.adminService.getCancelledAppointments(this.obj).subscribe(res=>{
      this.allAppoints=res.appointments;
      this.pendingStat=false
      this.assignStat=false
     })
  }

  assignDoctor(index:number){
    console.log(index)
    this.adminService.assigneDoctor(this.notAssignedAppointments[index]).subscribe(res=>{
          this.assigned()
    })
  }

}
