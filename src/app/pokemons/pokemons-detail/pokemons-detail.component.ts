import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-pokemons-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pokemons-detail.component.html',
  styleUrl: './pokemons-detail.component.scss',
})
export class PokemonsDetailComponent implements OnInit {
  pokemon: any;
  route = inject(ActivatedRoute);
  pokemonsService = inject(PokemonsService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const pokemonId = params['id'];
      this.getPokemonById(pokemonId);
    });
  }

  getPokemonById(id: number): void {
    this.pokemonsService.getPokemonById(id).subscribe({
      next: (pokemon: any) => (this.pokemon = pokemon),
      error: (error) => console.error('Error fetching Pokemon:', error),
    });
  }
}
