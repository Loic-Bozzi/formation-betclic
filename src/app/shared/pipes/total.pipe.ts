import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(value: any, ...args: any[]): number {
    if(value)
    {
      if('TTC' in args)
      {
        return value.totalTtc()
      }
      else{
        return value.totalHt()
      }
      console.log(args)
    }
  }

}
