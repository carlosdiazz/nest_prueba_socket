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
  ) {}

  @WebSocketServer()
  private server: Server;

  afterInit(server: any) {
    console.log('Se inicia cuando inicia el servicio de Socket');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Se ejecuta cuando alguien se CONECTA al WS');
    const responseAuthorization = client.handshake.headers.authorization;
    if (!responseAuthorization) return;

    const [, token] = responseAuthorization.split(' ');
    const payloadToken = this.authService.validateJwtToken(token);
    this.userService.connectUser(payloadToken.id);

    //this.handleDisconnect(client);
  }

  handleDisconnect(client: Socket) {
    console.log('Se ejecuta cuando alguien se DESCONECTA al WS');

    const responseAuthorization = client.handshake.headers.authorization;
    if (!responseAuthorization) return;

    const [, token] = responseAuthorization.split(' ');
    const payloadToken = this.authService.validateJwtToken(token);
    this.userService.disconectUser(payloadToken.id);
  }

  @SubscribeMessage('nuevo_mensaje')
  handleMessage(client: Socket, payload: any) {
    //console.log('Alguien envio un mensaje');
    this.emitirBands();
  }

  @SubscribeMessage('vote_band')
  async voteBand(client: Socket, payload: any) {
    console.log(`VOTARON : ${payload.id}`);
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
