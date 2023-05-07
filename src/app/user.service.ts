import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usermodel } from './models/user';
import { hospitalmodel } from './models/hospital';
import { appointmentmodel } from './models/appointement';
import { emergencymodel } from './models/emergency';
interface updateprofilemodel {
  message: String,
  user: usermodel
}
interface loginresponse {
  message: string,
  username: string,
  token: string,
  userObj: usermodel,
  hospitalObj: hospitalmodel
}
interface appointementresponse{
  message:String,
  appointments:appointmentmodel[]
}
interface emergencymodelres{
  message: string, 
  succ: string, 
  doctorName: string, 
  hospitalName: string, 
  emergency: emergencymodel
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginStatus: boolean = false
  user: any
  constructor(private hc: HttpClient) {

    if (localStorage.getItem('user') != null) {
      this.loginStatus = true
    }
  }
  updateProfile(userObj: usermodel): Observable<updateprofilemodel> {
    return this.hc.put<updateprofilemodel>(`http://localhost:3005/user/updateProfile/${userObj.username}`, userObj)
  }
  updateProfileImage(userObj: Object): Observable<updateprofilemodel> {
    return this.hc.put<updateprofilemodel>(`http://localhost:3005/user/updateProfile`, userObj)
  }
  onclickingSignUp(userObj: Object): Observable<{ message: String }> {
    return this.hc.post<{ message: String }>('http://localhost:3005/user/register', userObj)
  }

  login(loginObj:Object): Observable<loginresponse> {
    return this.hc.post<loginresponse>('http://localhost:3005/login', loginObj)
  }

  addAppointment(appointmentObj: Object): Observable<{message:String,appointmentobj:appointmentmodel}> {
    return this.hc.post<{message:String,appointmentobj:appointmentmodel}>('http://localhost:3005/appointment/addappointment', appointmentObj)
  }

  getUserAppointments(username: string): Observable<appointementresponse> {
    return this.hc.get<appointementresponse>(`http://localhost:3005/appointment/appointments/${username}`)
  }

  cancelAppointment(appointmentObj: appointmentmodel): Observable<appointementresponse> {
    return this.hc.post<appointementresponse>('http://localhost:3005/appointment/cancel-appointments', appointmentObj)
  }

  acceptAppointment(appointmentObj: appointmentmodel): Observable<appointementresponse> {
    return this.hc.post<appointementresponse>('http://localhost:3005/appointment/accept-appointments', appointmentObj)
  }
  emergencyAppointment(appointmentObj:emergencymodel): Observable<emergencymodelres> {
    return this.hc.post<emergencymodelres>('http://localhost:3005/hospital/emergency', appointmentObj)
  }
  getEmergencyAppointment(username: string): Observable<any> {
    return this.hc.get(`http://localhost:3005/appointment/emergencyAppointments/${username}`)
  }
}
