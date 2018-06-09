import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(item: string) {
      return `${item.substring(0, 4)}-${item.substring(4, 6)}-${item.substring(6, 8)} ${item.substring(8, 10)}:${item.substring(10, 12)}`;
  }

}
