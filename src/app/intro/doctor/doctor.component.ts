import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { doctorsmodel } from 'src/app/models/doctors';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  p:any=1
  allDoctors:doctorsmodel[]=[];
  constructor(private adminService:AdminService,private router:Router){}

  doctorProfile(data:doctorsmodel){
    this.adminService.doctor=data
     this.router.navigateByUrl('/doctorprofile')
  }

  ngOnInit(): void {
    let obj={
      name:"Apollo"
    }
    this.adminService.getAllDoctors(obj).subscribe(res=>{
     this.allDoctors=res.doctorObj;
     console.log(this.allDoctors)
    })
  }
}
