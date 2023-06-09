import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

//PROPIO
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-auth.guard';
import { BandService } from 'src/components/band/band.service';
import { UserService } from '../user/user.service';
import { MensajesService } from '../mensajes/mensajes.service';
import { CreateMensajeDto } from '../mensajes/dto/create-mensaje.dto';

@WebSocketGateway({
  transports: ['websocket'],
  //namespace: 'chat',
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtAuthGuard)
export class BandGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly bandsService: BandService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mensajeService: MensajesService,
  ) {}

  @WebSocketServer()
  private server: Server;

  afterInit() {
    console.log('Se inicia cuando inicia el servicio de Socket');
  }

  handleConnection(client: Socket, ...args: any[]) {
    try {
      //console.log('Se ejecuta cuando alguien se CONECTA al WS');
      const responseAuthorization = client.handshake.headers.authorization;
      if (!responseAuthorization) return;
      //Verificaciopn del cliente para obtener su ID
      console.log(responseAuthorization);
      const [, token] = responseAuthorization.split(' ');
      const payloadToken = this.authService.validateJwtToken(token);
      this.userService.connectUser(payloadToken.id);

      //Ingresar al usuario a una sala en particular
      //console.log(payloadToken.id);
      client.join(payloadToken.id);
    } catch (error) {
      console.log(`Error 1 => ${error}`);
    }
  }

  handleDisconnect(client: Socket) {
    try {
      //console.log('Se ejecuta cuando alguien se DESCONECTA al WS');

      const responseAuthorization = client.handshake.headers.authorization;
      if (!responseAuthorization) return;

      const [, token] = responseAuthorization.split(' ');
      const payloadToken = this.authService.validateJwtToken(token);
      this.userService.disconectUser(payloadToken.id);
    } catch (error) {
      console.log(`Error 2 => ${error}`);
    }
  }

  @SubscribeMessage('nuevo_mensaje')
  async handleMessage(client: Socket, payload: CreateMensajeDto) {
    await this.mensajeService.create(payload);
    this.server.to(payload.para).emit('mensaje_personal', payload);
  }

  @SubscribeMessage('vote_band')
  async voteBand(client: Socket, payload: any) {
    //console.log(`VOTARON : ${payload.id}`);
    await this.bandsService.addVote(payload.id);
    this.emitirBands();
  }

  @SubscribeMessage('add_band')
  async addBand(client: Socket, payload: any) {
    //console.log(`CREARON : ${payload.name}`);
    await this.bandsService.create({ name: payload.name, votes: 0 });
    this.emitirBands();
  }

  @SubscribeMessage('remove_band')
  async removeBand(client: Socket, payload: any) {
    //console.log(`BORRARON : ${payload.id}`);
    await this.bandsService.remove(payload.id);
    this.emitirBands();
  }

  async emitirBands() {
    const bands = await this.bandsService.findAll();
    const bandasjson = JSON.stringify(bands);
    this.server.emit('active_bands', bandasjson);
  }
}
