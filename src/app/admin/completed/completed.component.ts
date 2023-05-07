import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { appointmentmodel } from 'src/app/models/appointement';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  completedAppoints:appointmentmodel[]=[];
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    let obj={
      name:"Apollo"
    }
 
  }

}
