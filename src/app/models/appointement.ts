import { prescriptionmodel } from "./prescription";

export interface appointmentmodel{
    _id:String,
    userid:String,
    patientname:String,
    phonenumber:Number,
    email:String,
    date:String,
    timeslot:String,
    specialization:String,
    emergencyname:String,
    emergencyphone:String,
    doctor:String,
    problem:String,
    status:String,
    hospitalName:String,
    prescription:prescriptionmodel,
    rating:String,
    username:String,
    addDescription:any
}