import { appointmentmodel } from "./appointement";
import { emergencymodel } from "./emergency";

export interface usermodel{
    _id:String,
    fullname:String,
    username:String,
    phonenumber:Number,
    email:String,
    password:String,
    date:String,
    city:String,
    pincode:Number,
    state:String,
    gender:String,
    image:String,
    emergency:emergencymodel,
    myappointmnet:appointmentmodel
}