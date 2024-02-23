import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Evolution extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pokedexId: number;
}

export const EvoltionSchema = SchemaFactory.createForClass(Evolution);
