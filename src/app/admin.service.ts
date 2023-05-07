import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appointmentmodel } from './models/appointement';
import { doctorsmodel } from './models/doctors';
import { emergencymodel } from './models/emergency';
interface responseofassigndoctor{
  messgae:String,
  succ:String,
  doctorName:String
}
interface responsealldetails{
  message:string,
  emergencyObj:emergencymodel[],
  doctorObj:doctorsmodel[],
  appointmentObj:appointmentmodel[]
}
interface pendingres{ message: String, 
  assignedAppointments: appointmentmodel[], 
  notAssignedAppointments: appointmentmodel[] 
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  doctor=<doctorsmodel>{}
  constructor(private hc:HttpClient) { }

  getCancelledAppointments(hospital:{name:String}):Observable<{message:String,appointments:appointmentmodel[]}>{
    return this.hc.post<{message:String,appointments:appointmentmodel[]}>('http://localhost:3005/appointment/cancelled-appointments',hospital);
  }

  getCompletedAppointments(hospital:{name:String}):Observable<{message:String,appointments:appointmentmodel[]}>{
    return this.hc.post<{message:String,appointments:appointmentmodel[]}>('http://localhost:3005/appointment/completed-appointments',hospital);
  }

  getPendingAppointments(hospital:{name:String}):Observable<pendingres>{
    return this.hc.post<pendingres>('http://localhost:3005/appointment/pending-appointments',hospital);
  }

  getAllAppointments(hospital:{name:String}):Observable<{message:String,appointments:appointmentmodel[]}>{
    // console.log(hospital);
    return this.hc.post<{message:String,appointments:appointmentmodel[]}>('http://localhost:3005/appointment/hospitalAppointments',hospital);
  }

  getAllDoctors(hospital:{name:String}):Observable<{message:String,doctorObj:doctorsmodel[]}>{
    return this.hc.post<{message:String,doctorObj:doctorsmodel[]}>('http://localhost:3005/doctor/all-doctors',hospital);
  }

  addDoctor(doctorObj:Object):Observable<{message:String}>{
    return this.hc.post<{message:String}>('http://localhost:3005/doctor/add-doctor',doctorObj);
  }

  assigneDoctor(appointmentObj:appointmentmodel):Observable<responseofassigndoctor>{
    return this.hc.post<responseofassigndoctor>('http://localhost:3005/appointment/assign-appointments',appointmentObj)
  }
  getEmergencyAppointments():Observable<{message:String,appointments:emergencymodel[]}>{
    return this.hc.get<{message:String,appointments:emergencymodel[]}>('http://localhost:3005/appointment/getAllEmergencyAppointments')
  }

  getAllDetails():Observable<responsealldetails>{
    return this.hc.get<responsealldetails>('http://localhost:3005/appointment/getAllDetails')
  }
 
}
