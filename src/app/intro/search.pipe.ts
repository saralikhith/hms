import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(dotor:any[],searchItem:string):any{
    
    if(!dotor || !searchItem){
     return dotor
    }
    return dotor.filter(doctorObj=>{
   if(doctorObj.patientname.toLowerCase().indexOf(searchItem.toLowerCase())!=-1){
     return doctorObj
   }
   if(doctorObj.doctor.fullname.toLowerCase().indexOf(searchItem.toLowerCase())!=-1){
    return doctorObj
  }
    })
 }


}
