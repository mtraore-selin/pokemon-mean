import { CanDeactivateFn } from '@angular/router';
import { PokemonsAddComponent } from '../pokemons/pokemons-add/pokemons-add.component';
import { PokemonsEditComponent } from '../pokemons/pokemons-edit/pokemons-edit.component';

export const SaveBeforeQuitGuard: CanDeactivateFn<
  PokemonsAddComponent | PokemonsEditComponent
> = () => {
  const confirmation = confirm(
    'You have unsaved changes in your form. Are you sure you want to proceed?'
  );
  return confirmation;
};
