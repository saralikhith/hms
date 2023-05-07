import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appointmentmodel } from 'src/app/models/appointement';
import { emergencymodel } from 'src/app/models/emergency';
import { usermodel } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  today: string
  appointmentobj ={}
  emergencyObj = <emergencymodel>{}
  userObj:usermodel = JSON.parse(localStorage.getItem("user") || '')

  checkAnyThing(control: AbstractControl): ValidationErrors | null {
    let patientName = control.get('patientname')?.value
    let emergencyName = control.get('emergencyname')?.value
    if (patientName != '' && emergencyName != '') {
     
      return (patientName === emergencyName) ? { cannotBe: true } : null
    }
    return null
  }

  constructor(private us: UserService, private router: Router, private fb: FormBuilder) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().substring(0, 10);
  }
  appointmentForm = new FormGroup({
    patientname: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("[a-zA-Z]*")]),
    specialization: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeslot: new FormControl('', Validators.required),
    emergencyname: new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern("[a-zA-Z]*")]),
    emergencyphone: new FormControl('', [Validators.required, Validators.pattern('\\d{10}')]),
    problem: new FormControl('', [Validators.required, Validators.minLength(6)]),
    addDescription: this.fb.array([
    
    ], [Validators.maxLength(3)])
  }, {
    validators: this.checkAnyThing
  })
 
  get description() {
    return this.appointmentForm.get('addDescription') as FormArray
  }
  emergencyForm = this.fb.group({
    patientname: ['', [Validators.required, Validators.minLength(6)]],
    specialization: ['', Validators.required],
  })
  delete(ind:number){

      this.description.removeAt(ind)
  
    
  }
  flag : boolean = true
  addFeature() {
      if(this.flag){
        this.description.push(this.fb.control(''))
        setTimeout(()=>{
          this.flag = true
        },3000)
      this.flag = false
      }
  }
  bookAppointment() {
    this.appointmentForm.patchValue({
      problem:this.description.value.reduce((acc: string,curr: string)=>{
   
          return acc+" "+curr
      },this.appointmentForm.get('problem')?.value)
        
    })

    this.appointmentobj = {
      ...this.appointmentForm.value,
      "username": this.userObj.username,
      "email": this.userObj.email,
      "phonenumber": this.userObj.phonenumber,
      "userid": this.userObj._id,
      hospitalName: "Apollo"
    }
    
    

  
    this.us.addAppointment(this.appointmentobj).subscribe(
      {
        next: res => {
          if (res.message = "your appointment bookes successfully") {
            this.router.navigateByUrl('/user/userprofile')
          }
        },
        error: err => {
          console.log(err.message)
          alert('something went wrong')
        }
      }
    )
  }

  emergency() {
    console.log(this.emergencyForm.value)
    let now: any = new Date()
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const dateStr = `${day}-${month}-${year}`;
    let y = now.getHours()
    this.emergencyObj.patientname = this.emergencyForm.value.patientname || ""
    this.emergencyObj.specialization = this.emergencyForm.value.specialization || ""
    this.emergencyObj.appointmentdate = dateStr
    this.emergencyObj._id = JSON.parse(localStorage.getItem('user') || '')._id
    if (y < 10) {
      this.emergencyObj.timeslot = '10AM-11AM'
    }
    else if (y >= 10 && y < 11) {
      this.emergencyObj.timeslot = `11AM-12PM`
    }
    else if (y >= 11 && y < 12) {
      this.emergencyObj.timeslot = `12PM-1PM`
    }
    else if (y < 16) {
      y -= 12
      this.emergencyObj.timeslot = `${y + 1}PM-${y + 2}PM`
    }
    else {
      alert('doctor not available')
      this.router.navigateByUrl('/user/appointment')
      return
    }
    this.us.emergencyAppointment(this.emergencyObj).subscribe(
      res => {
        alert(res.message)

        this.router.navigateByUrl('/user/myappointments')
      },
      err => {
        console.log(err)
      }
    )
  }
  get patientName() {
    return this.appointmentForm.get('patientname') as FormControl
  }
  get specialization() {
    return this.appointmentForm.get('specialization') as FormControl
  }
  get date() {
    return this.appointmentForm.get('date') as FormControl
  }
  get timeslot() {
    return this.appointmentForm.get('timeslot') as FormControl
  }
  get emergencyname() {
    return this.appointmentForm.get('emergencyname') as FormControl
  }
  get emergencyphone() {
    return this.appointmentForm.get('emergencyphone') as FormControl
  }
  get problem() {
    return this.appointmentForm.get('problem') as FormControl
  }

  get emergencyName() {
    return this.emergencyForm.get('patientname') as FormControl
  }
  get emSpecilization() {
    return this.emergencyForm.get('specialization') as FormControl
  }

}
