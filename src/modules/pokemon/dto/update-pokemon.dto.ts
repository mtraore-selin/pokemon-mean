import { PickType } from '@nestjs/swagger';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PickType(CreatePokemonDto, [
  'stats',
] as const) {}
