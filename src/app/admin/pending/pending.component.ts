import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { appointmentmodel } from 'src/app/models/appointement';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  pendingAppoints:appointmentmodel[]=[];
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    let obj={
      name:"Apollo"
    }

  }

}
