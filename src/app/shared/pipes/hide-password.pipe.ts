import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassword',
  standalone: true,
})
export class HidePasswordPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value === 'string') {
      return '....';
    }
    return value;
  }
}
