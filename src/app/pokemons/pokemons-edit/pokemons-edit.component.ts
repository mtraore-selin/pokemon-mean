import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../shared/form/form-utils.service';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-pokemons-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pokemons-edit.component.html',
  styleUrl: './pokemons-edit.component.scss',
})
export class PokemonsEditComponent {
  formUtils = inject(FormUtilsService);
  private snackBar = inject(MatSnackBar);
  private pokemonsService = inject(PokemonsService);
  private location = inject(Location);
  route = inject(ActivatedRoute);
  router = inject(Router);

  pokemon: Pokemon | undefined;
  form = new FormGroup({
    hp: new FormControl(0),
    attack: new FormControl(0),
    defense: new FormControl(0),
    specialDefense: new FormControl(0),
    specialAttack: new FormControl(0),
    speed: new FormControl(0),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const pokemonId = params['id'];
      this.getPokemonById(pokemonId);
    });
  }

  getPokemonById(id: number): void {
    this.pokemonsService.getPokemonById(id).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemon = pokemon;
        this.form.patchValue({
          hp: pokemon.stats.HP,
          attack: pokemon.stats.Attack,
          defense: pokemon.stats.Defense,
          specialDefense: pokemon.stats['Sp Defense'],
          specialAttack: pokemon.stats['Sp Attack'],
          speed: pokemon.stats.Speed,
        });
      },
      error: (error) => console.error('Error fetching Pokemon:', error),
    });
  }

  onSubmit() {
    if (this.form.valid && this.pokemon?.pokedexId) {
      this.pokemonsService
        .updatePokemon(+this.pokemon.pokedexId, {
          HP: this.form.value.hp!,
          Attack: this.form.value.attack!,
          Defense: this.form.value.defense!,
          'Sp Attack': this.form.value.specialAttack!,
          'Sp Defense': this.form.value.specialDefense!,
          Speed: this.form.value.speed!,
        })
        .subscribe({
          next: () => {
            this.onSuccess();
            this.router.navigate(['']);
          },
          error: () => this.onError(),
        });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  private onSuccess() {
    this.snackBar.open('Pokemon saved successfully!', '', { duration: 5000 });
    this.form.reset();
  }

  private onError() {
    this.snackBar.open('Error saving pokemon.', '', { duration: 10000 });
  }

  onCancel() {
    this.location.back();
  }
}
