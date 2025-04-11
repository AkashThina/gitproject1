import { Pipe } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe {

  transform(value: string, ...args: unknown[]): string {
   if(!value) return ''
   return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
