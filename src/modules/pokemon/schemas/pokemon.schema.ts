import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from './base.schema';
import { Name } from './name.schema';
import { Type } from './type.schema';
import { Evolution } from './evolution.schema';

@Schema()
export class Pokemon extends Document {
  // 'id' is the Pokemon Pokedex number which is unique
  // This will prevent a document being saved with the same pokedex number
  @Prop({ required: true, unique: true })
  pokedexId: number;

  @Prop({ required: true })
  name: Name;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  types: Type[];

  @Prop({ required: true })
  evolutions: Evolution[];

  @Prop({ required: true })
  sprite: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  stats: Base;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
