import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../../pokemons/pokemon';

@Pipe({
  name: 'sortName',
  standalone: true,
})
export class SortNamePipe implements PipeTransform {
  transform(value: Pokemon[]): Pokemon[] {
    if (!value || !Array.isArray(value)) {
      return value;
    }

    return value.sort((a: Pokemon, b: Pokemon) => {
      const slugA = a.slug.toLowerCase();
      const slugB = b.slug.toLowerCase();
      if (slugA < slugB) {
        return -1;
      } else if (slugB < slugA) {
        return 1;
      }
      return 0;
    });
  }
}
