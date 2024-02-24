import { Routes } from '@angular/router';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { PokemonsDetailComponent } from './pokemons-detail/pokemons-detail.component';
import { PokemonsEditComponent } from './pokemons-edit/pokemons-edit.component';
import { PokemonsAddComponent } from './pokemons-add/pokemons-add.component';
import { AuthGuard } from '../auth/auth.guard';
import { SaveBeforeQuitGuard } from '../auth/save-before-quit.guard';

export const POKEMON_ROUTES: Routes = [
  { path: '', component: PokemonsListComponent },
  { path: 'detail/:id', component: PokemonsDetailComponent },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    canDeactivate: [SaveBeforeQuitGuard],
    component: PokemonsEditComponent,
  },
  {
    path: 'new',
    canActivate: [AuthGuard],
    canDeactivate: [SaveBeforeQuitGuard],
    component: PokemonsAddComponent,
  },
];
