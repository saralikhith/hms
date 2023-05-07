import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usermodel } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private us: UserService, private router: Router) {}
  userObj=<usermodel>{};
  file!: File;
  selectFile(eventObj: any) {
    
    this.file = eventObj.target.files[0];
  }

  onSignUp(data: any) {
    this.userObj = data;
    console.log(data)
    //create form object
    let formData = new FormData();
    //append file to form data
    formData.append('image', this.file, this.file.name);

    //append userObj
    formData.append('userObj', JSON.stringify(this.userObj));
 

    this.us.onclickingSignUp(formData).subscribe({
      next: (res) => {
        if (res.message == 'registration successful') {
          alert(res['message']);
          //navigate to login component
          this.router.navigateByUrl('login');
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
