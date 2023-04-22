import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//Propio
import { MensajesService } from './mensajes.service';
import { MensajesController } from './mensajes.controller';
import { Mensaje, MensajeSchema } from './entities/mensaje.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Mensaje.name,
        schema: MensajeSchema,
      },
    ]),
  ],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule {}
