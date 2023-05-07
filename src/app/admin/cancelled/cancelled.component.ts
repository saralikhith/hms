import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { appointmentmodel } from 'src/app/models/appointement';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.css']
})
export class CancelledComponent  implements OnInit{

  cancelledAppoints:appointmentmodel[]=[];
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    let obj={
      name:"Apollo"
    }
    this.adminService.getCancelledAppointments(obj).subscribe(res=>{
     this.cancelledAppoints=res.appointments;
    })
  }

}
