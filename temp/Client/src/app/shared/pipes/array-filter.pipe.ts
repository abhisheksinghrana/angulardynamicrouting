import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {
  transform(
    items: any[],
    callback: (item: any, fields?: any) => boolean,
    fields?: any
  ): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => callback(item, fields));
  }
}
