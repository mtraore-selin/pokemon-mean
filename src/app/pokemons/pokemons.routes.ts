import { Routes } from '@angular/router';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonsDetailComponent } from './pokemons-detail/pokemons-detail.component';
import { PokemonsEditComponent } from './pokemons-edit/pokemons-edit.component';
import { PokemonsAddComponent } from './pokemons-add/pokemons-add.component';

export const POKEMON_ROUTES: Routes = [
  { path: '', component: PokemonsListComponent },
  { path: 'detail/:id', component: PokemonsDetailComponent },
  { path: 'edit/:id', component: PokemonsEditComponent },
  { path: 'new', component: PokemonsAddComponent },
];
