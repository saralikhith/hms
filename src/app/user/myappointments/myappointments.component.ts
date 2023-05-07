import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appointmentmodel } from 'src/app/models/appointement';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.css']
})
export class MyappointmentsComponent implements OnInit{
  ngOnInit(): void {
   
    this.regular()
  
   }
  appointmentObj:appointmentmodel[] = []
  value:string='Regular'
  constructor(private us: UserService,private router:Router) {

  }
  username: string = localStorage.getItem('username') || ''
  regular() {
    this.value='Regular'
    this.us.getUserAppointments(this.username).subscribe(
      res => {
        this.appointmentObj = res.appointments
        
      },
      err => {
        console.log(err)
      }
    )
  }
  emergency() {
    this.value='Emergency'
    this.us.getEmergencyAppointment(this.username).subscribe(
      res=>{
           this.appointmentObj = res.appointments.emergency 
         
      },
      err=>{
        console.log(err)
      }
    )
  }





}
