import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  
  constructor(public us: UserService, private router: Router) {
    console.log(us.loginStatus);
  }
  logOut() {
    localStorage.clear();
    this.us.loginStatus = false;
    this.router.navigateByUrl(`/login`);
  }
  bookAppointment() {
    if (localStorage.getItem('username') == null) {
      alert('please login to make an appointment');
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/user/appointment');
    }
  }
  ngOnInit(): void {
    this.us.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
