import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent  implements OnInit{
  constructor(public us:UserService){
  }
  file!: File;
  selectFile(eventObj: any) {
    this.file = eventObj.target.files[0];

  }
  edit : boolean = false
  disable:boolean=false
  ngOnInit(): void {
    this.userObj = this.us.user
  }
  editProfile(){
      this.edit=true
  }
  save(data:any){
    this.userObj={...this.us.user,...data}
    if(this.file==undefined){
      this.us.updateProfile(this.userObj).subscribe({
        next:res=>{
           alert(res.message)
           localStorage.setItem("user",JSON.stringify(res.user))
        },
        error:err=>{
  
        }
      })
    }
    else{
      let formData = new FormData();
     
      //append file to form data
      formData.append('image', this.file, this.file.name);
  
      //append userObj
      formData.append('userObj', JSON.stringify(this.userObj));
      this.disable=true
      this.us.updateProfileImage(formData).subscribe({

        next: (res) => {
          if (res.message == 'changes successfully done') {
            alert(res['message']);
            this.edit=false
            this.disable=false
            localStorage.setItem("user",JSON.stringify(res.user))
            //navigate to login component
             this.userObj.image=res.user.image
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err.message);
          alert('something went wrong');
        },
      });
    }

   
  }
  userObj : any
}
