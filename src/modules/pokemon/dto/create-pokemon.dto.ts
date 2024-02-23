import {
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// for mutiples languages
export class Name {
  @IsString()
  @ApiProperty()
  english: string;

  @IsString()
  @ApiProperty()
  japanese: string;

  @IsString()
  @ApiProperty()
  chinese: string;

  @IsString()
  @ApiProperty()
  french: string;
}

export class Base {
  @IsNumber()
  @ApiProperty()
  HP: number;

  @IsNumber()
  @ApiProperty()
  Attack: number;

  @IsNumber()
  @ApiProperty()
  Defense: number;

  @IsNumber()
  @ApiProperty()
  'Sp Attack': number;

  @IsNumber()
  @ApiProperty()
  'Sp Defense': number;

  @IsNumber()
  @ApiProperty()
  Speed: number;
}

export class TypeDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  image: string;
}

export class ApiEvolutions {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  pokedexId: string;
}

export class CreatePokemonDto {
  @IsNumber()
  @ApiProperty({ description: 'Pokemons pokedex number.', example: 25 })
  pokedexId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Name)
  @ApiProperty({
    description: 'Name of the pokemon in different languages.',
    example: {
      english: 'Pikachu',
      japanese: 'ピカチュウ',
      chinese: '皮卡丘',
      french: 'Pikachu',
    },
  })
  name: Name;

  @IsString()
  @ApiProperty({
    description: 'Pokemons image',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  })
  image: string;

  @IsArray()
  @ValidateNested()
  @Type(() => TypeDto)
  @ApiProperty({
    description: 'Pokemons type.',
    example: [
      {
        name: 'Électrik',
        image:
          'https://static.wikia.nocookie.net/pokemongo/images/2/2f/Electric.png',
      },
    ],
  })
  types: TypeDto[];

  @IsArray()
  @ApiProperty({
    description: 'Pokemons api evolutions.',
    example: [
      {
        name: 'Raichu',
        pokedexId: 26,
      },
    ],
  })
  evolutions: ApiEvolutions[];

  @IsString()
  @ApiProperty({
    description: 'Pokemon sprite.',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  })
  sprite: string;

  @IsString()
  @ApiProperty({ description: 'Pokemon sprite.', example: 'Pikachu' })
  slug: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Base)
  @ApiProperty({
    description: 'Pokemons base stats.',
    example: {
      HP: 35,
      Attack: 55,
      Defense: 40,
      'Sp Attack': 50,
      'Sp Defense': 50,
      Speed: 90,
    },
  })
  stats: Base;
}
