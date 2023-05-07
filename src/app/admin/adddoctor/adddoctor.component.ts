import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { doctorsmodel } from 'src/app/models/doctors';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.css']
})
export class AdddoctorComponent {
  doctorObj=<any>{};
  file!: File;
  selectFile(eventObj: any) {
    this.file = eventObj.target.files[0];
  }
  constructor(private adminService:AdminService,public router:Router,private fb:FormBuilder){}
  ngOnInit(): void {
   
  }
  changeToLowerCase(control:FormControl){
    const value=control.value
    if(value!=''){
      console.log(value)
      control.setValue(value.toLowerCase())
    }
     
      return null
  }
  comparePasswordAndConfirmPassword(control: AbstractControl): ValidationErrors | null {
    let patientName = control.get('password')?.value
    let emergencyName = control.get('cnpassword')?.value
    console.log()
    if (patientName != '' && emergencyName != '') {
      console.log('xxxxxxxxxxxx')
      return (patientName != emergencyName) ? { cannotBe: true } : null
    }
    return null
  }
  doctorForm=this.fb.group({
    fullname:['',[Validators.required,Validators.pattern("[a-zA-Z]*"),Validators.minLength(6)]],
    email:['',[Validators.required,Validators.email]],
    join_date:['',[Validators.required]],
    join_time:['',[Validators.required]],
    password:['',[Validators.required]], 
    phonenumber:['',[Validators.required,Validators.pattern('\\d{10}')]],
    specialization:['',[Validators.required]],
    about:['',[Validators.required,Validators.pattern("[a-zA-Z]*"),,Validators.minLength(6)]],
    cnpassword:['',[Validators.required]],
    gender:['',[Validators.required]],
    username:['',[Validators.required,Validators.minLength(6)]],
},{
  validators : this.comparePasswordAndConfirmPassword
}) 
   get fullname() {
    return this.doctorForm.get('fullname') as FormControl
  } 
   get email() {
    return this.doctorForm.get('email') as FormControl
  }  
  get join_date() {
    return this.doctorForm.get('join_date') as FormControl
  }  
  get join_time() {
    return this.doctorForm.get('join_time') as FormControl
  } 
   get password() {
    return this.doctorForm.get('password') as FormControl
  }
  get phonenumber() {
    return this.doctorForm.get('phonenumber') as FormControl
  }
  get specialization() {
    return this.doctorForm.get('specialization') as FormControl
  }
  get about() {
    return this.doctorForm.get('about') as FormControl
  }
  get cnpassword() {
    return this.doctorForm.get('cnpassword') as FormControl
  }
  get username() {
    return this.doctorForm.get('username') as FormControl
  }
  get gender() {
    return this.doctorForm.get('gender') as FormControl
  }


  addDoctor():void {
    this.doctorObj = this.doctorForm.value;
    console.log(this.doctorForm.value)

    this.doctorObj.hospitalName='Apollo'
    
    //create form object
    let formData = new FormData();
    //append file to form data
    formData.append('image', this.file, this.file.name);

    //append userObj
    formData.append('doctorObj', JSON.stringify(this.doctorObj));
  
    this.adminService.addDoctor(formData).subscribe(res=>{
      alert(res.message)
      if(res.message=='Doctor added successfully'){
             this.router.navigateByUrl('admin/doctor')
      }
    })
  }

  







  


}
