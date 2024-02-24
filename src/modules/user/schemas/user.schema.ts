import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enum/role.enum';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: String, enum: Object.values(Role) }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
