import { ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class User {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  //TODO quitar que se vea contrasena
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: true })
  online: boolean;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
