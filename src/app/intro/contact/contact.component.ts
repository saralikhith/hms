import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usermodel } from 'src/app/models/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(private fb:FormBuilder,private router:Router){

  }
  ngOnInit(): void {
   
  }

  contactForm=this.fb.group({
    fullname:['',[Validators.required,Validators.pattern("[a-zA-Z]*")]],
    email:['',[Validators.required,Validators.email]],
    subject:['',[Validators.required,Validators.minLength(6)]],
    message:['',[Validators.required,Validators.minLength(6)]]
  })

  get fullname(){
    return this.contactForm.get('fullname') as FormControl
  }
  get emaill(){
    return this.contactForm.get('email') as FormControl
  }
  get subject(){
    return this.contactForm.get('subject') as FormControl
  }
  get message(){
    return this.contactForm.get('message') as FormControl
  }

  onSubmit(){
     alert('we will respond to it ')
     this.router.navigateByUrl('/home')
  }

}
