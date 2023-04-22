import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

//PROPIO
import { MensajesService } from './mensajes.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { payloadTokenInterface } from 'src/auth/types/types';

@UseGuards(JwtAuthGuard)
@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto) {
    return this.mensajesService.create(createMensajeDto);
  }

  @Get()
  findAll(@CurrentUser() payloadToken: payloadTokenInterface) {
    return this.mensajesService.findAll(payloadToken);
  }

  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.mensajesService.findOne(+id);
  //}

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateMensajeDto: UpdateMensajeDto) {
  //  return this.mensajesService.update(+id, updateMensajeDto);
  //}
  //
  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.mensajesService.remove(+id);
  //}
}
