import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Band {
  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  _id: string;
}

export type BandDocument = HydratedDocument<Band>;

export const BandSchema = SchemaFactory.createForClass(Band);
