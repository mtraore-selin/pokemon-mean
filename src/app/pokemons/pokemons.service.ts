import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, Base } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  // private baseUrl = 'https://pokebuildapi.fr/api/v1/pokemon';
  private baseUrl = 'http://localhost:3000/api/v1/pokemon';

  private http = inject(HttpClient);

  // Get all Pokemon
  getAllPokemons(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get Pokemon by ID
  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new Pokemon TODO: any==> Pokemon
  createPokemon(pokemonData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, pokemonData);
  }

  // Update an existing Pokemon
  updatePokemon(id: number, pokemonData: Base): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, { stats: pokemonData });
  }

  // Delete a Pokemon
  deletePokemon(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
