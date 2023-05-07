import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-emergencyappointments',
  templateUrl: './emergencyappointments.component.html',
  styleUrls: ['./emergencyappointments.component.css']
})
export class EmergencyappointmentsComponent {
    @Input() appointments:any
    @Output() acceptAppoint=new EventEmitter<any>()
    @Output() cancelAppoint=new EventEmitter<any>()

    constructor(private router:Router,private us:UserService){
   
    }

    acceptAppointment(index:number){
     
      this.us.acceptAppointment(this.appointments[index]).subscribe(res=>{
        alert(res.message)
        this.router.navigateByUrl('user/myappointments')
       
        // console.log(res);
      })
  
    }

    cancelAppointment(index:number){
      this.appointments[index]['username']=localStorage.getItem('username');
      this.us.cancelAppointment(this.appointments[index]).subscribe(res=>{
        alert(res.message)
        this.router.navigateByUrl('user/myappointments')
        // console.log(res);
        
      })
     
   
    }
}
