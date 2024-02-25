import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../shared/form/form-utils.service';
import { PokemonsService } from '../pokemons.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pokemons-add.component.html',
  styleUrl: './pokemons-add.component.scss',
})
export class PokemonsAddComponent {
  form: FormGroup;
  formUtils = inject(FormUtilsService);
  location = inject(Location);
  pokemonsService = inject(PokemonsService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      pokedexId: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      nameFr: [
        'Bulbizarre',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      nameEn: [
        'Bulbizarre',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      nameJp: [
        '球界',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      nameCh: [
        '灯泡',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      image: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        [Validators.required],
      ],
      sprite: [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        [Validators.required],
      ],
      slug: ['Bulbizarre', [Validators.required]],
      hp: [45, [Validators.required, Validators.min(1), Validators.max(100)]],
      attack: [
        49,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      defense: [
        49,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      specialDefense: [
        65,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      specialAttack: [
        65,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      speed: [
        45,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],

      types: this.fb.array([]),
      evolutions: this.fb.array([]),
    });
  }
  //create init form private: todo

  //  For types
  get typesForms() {
    return this.form.get('types') as FormArray;
  }
  addTypess() {
    const type = this.fb.group({
      name: ['Poison', Validators.required],
      image: [
        'https://static.wikia.nocookie.net/pokemongo/images/0/05/Poison.png',
        Validators.required,
      ],
    });

    this.typesForms.push(type);
  }
  deleteTypes(i: number) {
    this.typesForms.removeAt(i);
  }

  // for evolutions
  get evolutionsForms() {
    return this.form.get('evolutions') as FormArray;
  }
  addEvolutions() {
    const evolution = this.fb.group({
      name: ['Herbizarre', Validators.required],
      pokedexId: [2, Validators.required],
    });
    this.evolutionsForms.push(evolution);
  }
  deleteEvolutions(i: number) {
    this.evolutionsForms.removeAt(i);
  }
  submit() {
    if (this.form.valid) {
      const pokemonData = {
        pokedexId: this.form.value.pokedexId,
        name: {
          french: this.form.value.nameFr,
          english: this.form.value.nameEn,
          japanese: this.form.value.nameJp,
          chinese: this.form.value.nameCh,
        },
        image: this.form.value.image,
        sprite: this.form.value.sprite,
        slug: this.form.value.slug,
        stats: {
          HP: this.form.value.hp,
          Attack: this.form.value.attack,
          Defense: this.form.value.defense,
          'Sp Attack': this.form.value.specialAttack,
          'Sp Defense': this.form.value.specialDefense,
          Speed: this.form.value.speed,
        },
        types: this.typesForms.value,
        evolutions: this.evolutionsForms.value,
      };
      this.pokemonsService.createPokemon(pokemonData).subscribe({
        next: () => {
          this.onSuccess();
          this.router.navigate(['/pokemons']);
        },
        error: () => this.onError(),
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }
  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Pokemon saved successfully!', '', { duration: 5000 });
    this.form.reset();
  }

  private onError() {
    this.snackBar.open('Error saving pokemon.', '', { duration: 10000 });
  }
}
