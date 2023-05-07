import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public us:UserService,private router:Router){

  }
  onLogin(){
    this.us.login(this.login.value).subscribe({
      next:res=>{
       if(res.message=='user login success'){
         alert('login successs')
         localStorage.setItem('username',res.username)
         localStorage.setItem('token',res.token)
         localStorage.setItem('user',JSON.stringify(res.userObj))
         //navigate to user profile
         this.router.navigateByUrl(`user/userprofile`)
         //whenever login is success logout should be appeared
         this.us.loginStatus=true;
       }
       else if(res.message=='admin login success'){
        alert('login successs')
        localStorage.setItem('username',res.username)
        localStorage.setItem('token',res.token)
        localStorage.setItem('user',JSON.stringify(res.userObj))
           //navigate to user profile
             this.router.navigateByUrl(`/admin`)
                 //whenever login is success logout should be appeared
                 this.us.loginStatus=true;
               
       }
       else{
         alert(res.message)
       }
      },
      error:err=>{
       alert('something went wrong')
       console.log(err)
      }}
      
      )
  }
  login=new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
}
