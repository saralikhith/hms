import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  obj:any=[]
  get:boolean=false
  loading:boolean=false
  constructor(private ad:AdminService){

  }
 ngOnInit(): void {
  
   this.ad.getAllDetails().subscribe(
    res=>{
      this.obj=res
      this.get=true
      this.loading=true
    },
    err=>{
      console.log(err)
    }

  )
 }

}
