import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forfilter'
})
export class ForfilterPipe implements PipeTransform {

  transform(items: any[], arg1: string, arg2: string) {
      if (!items || !arg1 || !arg2) {
        return items;
      }
      if (arg2 === 'own') {
        return items.filter(item => item.admin === arg1);
      } else {
        return items.filter(item => item.admin !== arg1);
      }
  }

}
