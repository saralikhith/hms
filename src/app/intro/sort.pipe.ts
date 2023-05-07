import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(appointment:Array<any>,date:any): any{
    if (!appointment) {
      return [];
    }

    return appointment.sort((a:any, b:any) => {
      if (a[date] < b[date]) {
        return -1;
      }
      if (a[date] > b[date]) {
        return 1;
      }
      return 0;
    });
  }

}
