import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pokemons' },
  {
    path: 'pokemons',
    loadChildren: () =>
      import('./pokemons/pokemons.routes').then((r) => r.POKEMON_ROUTES),
  },
];
