import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

//Propio
import { User } from 'src/components/user/entities/user.entity';

@Schema({ timestamps: true })
export class Mensaje {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  de: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  para: string;

  @Prop({ required: true })
  texto: string;

  _id: string;
}

export type MensajeDocument = HydratedDocument<Mensaje>;

export const MensajeSchema = SchemaFactory.createForClass(Mensaje);
