import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './schemas/pokemon.schema';
import { MongoServerError } from 'mongodb';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel('pokemon')
    private pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const createdPokemon = await this.pokemonModel.create(createPokemonDto);
      return createdPokemon;
    } catch (error) {
      console.error(error);
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException(
          'A document with the same pokedex id already exists.',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonModel.find().sort({ pokedexId: 1 }).exec();
  }

  async findOne(pokedexId: number): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findOne({ pokedexId }).exec();

    if (!pokemon) throw new NotFoundException();

    return pokemon;
  }

  async update(
    pokedexId: number,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<void> {
    const updatedPokemon = await this.pokemonModel
      .findOneAndUpdate({ pokedexId }, updatePokemonDto)
      .exec();

    if (!updatedPokemon) throw new NotFoundException();
  }

  async remove(pokedexId: number): Promise<void> {
    const deletedPokemon = await this.pokemonModel
      .findOneAndDelete({ pokedexId })
      .exec();

    if (!deletedPokemon) throw new NotFoundException();
  }
}
