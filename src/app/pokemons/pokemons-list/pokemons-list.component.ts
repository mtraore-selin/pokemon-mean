import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './pokemons-list.component.html',
  styleUrl: './pokemons-list.component.scss',
})
export class PokemonsListComponent implements OnInit {
  private pokemonService = inject(PokemonsService);
  private snackBar = inject(MatSnackBar);

  pokemons$: Observable<any[]> = of([]);

  ngOnInit(): void {
    this.fetchPokemons();
  }

  private fetchPokemons() {
    this.pokemons$ = this.pokemonService.getAllPokemons();
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'sale':
        return 'pokemon-badge-sale';
      case 'feat':
        return 'pokemon-badge-feat';
      case 'new':
        return 'pokemon-badge-new';
      case 'oos':
        return 'pokemon-badge-oos';
      default:
        return 'pokemon-badge-default';
    }
  }

  trackByFn(index: number, item: Pokemon): number {
    return item.pokedexId;
  }

  onDeletePokemon(id: string) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this Pokémon?'
    );

    if (confirmDelete) {
      this.pokemonService.deletePokemon(+id).subscribe({
        next: () => {
          this.onSuccess();
          this.fetchPokemons();
        },
        error: () => this.onError(),
      });
    }
  }

  private onSuccess() {
    this.snackBar.open('Pokemon remove successfully!', '', { duration: 3000 });
  }

  private onError() {
    this.snackBar.open('Error saving pokemon.', '', { duration: 10000 });
  }
}
