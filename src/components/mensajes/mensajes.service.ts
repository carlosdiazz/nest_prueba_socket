import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

//PROPIO
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { payloadTokenInterface } from 'src/auth/types/types';
import { Mensaje } from './entities/mensaje.entity';

//import { UpdateMensajeDto } from './dto/update-mensaje.dto';

@Injectable()
export class MensajesService {
  constructor(
    @InjectModel(Mensaje.name) private mensajeModel: Model<Mensaje>,
  ) {}

  async create(createMensajeDto: CreateMensajeDto) {
    try {
      const newMensaje = new this.mensajeModel({
        de: createMensajeDto.de,
        para: createMensajeDto.para,
        texto: createMensajeDto.texto,
      });
      return await newMensaje.save();
    } catch (error) {
      console.log(`Error=> ${error}`);
      throw new BadRequestException(error?.message);
    }
  }

  async findAllByUser(payloadToken: payloadTokenInterface, mensajeDe: string) {
    const id = payloadToken.id;

    const mensajes = await this.mensajeModel
      .find({
        $or: [
          { de: id, para: mensajeDe },
          { de: mensajeDe, para: id },
        ],
      })
      .sort({ createdAt: -1 });

    return { data: mensajes };
  }

  //findOne(id: number) {
  //  return `This action returns a #${id} mensaje`;
  //}

  //update(id: number, updateMensajeDto: UpdateMensajeDto) {
  //  return `This action updates a #${id} mensaje`;
  //}
  //
  //remove(id: number) {
  //  return `This action removes a #${id} mensaje`;
  //}
}
