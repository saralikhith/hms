import { prescriptionmodel } from "./prescription";

export interface emergencymodel{
    appointmentdate:String,
    patientname:String,
    specialization:String,
    prescription:prescriptionmodel,
    doctor:String,
    status:String,
    timeslot:String,
    _id:String
}