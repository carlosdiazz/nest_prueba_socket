import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BandService } from 'src/components/band/band.service';

@WebSocketGateway({
  transports: ['websocket'],
  //namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class BandGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly bandsService: BandService) {}

  @WebSocketServer()
  private server: Server;

  afterInit(server: any) {
    console.log('Se inicia cuando inicia el servicio de Socket');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('Se ejecuta cuando alguien se conecta al servers');
  }

  handleDisconnect(client: Socket) {
    console.log('Se ejecuta cuando alguien se desconecta');
  }

  @SubscribeMessage('nuevo_mensaje')
  handleMessage(client: Socket, payload: any) {
    console.log('Alguien envio un mensaje');
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
    console.log(`CREARON : ${payload.name}`);
    await this.bandsService.create({ name: payload.name, votes: 0 });
    this.emitirBands();
  }

  @SubscribeMessage('remove_band')
  async removeBand(client: Socket, payload: any) {
    console.log(`BORRARON : ${payload.id}`);
    await this.bandsService.remove(payload.id);
    this.emitirBands();
  }

  async emitirBands() {
    const bands = await this.bandsService.findAll();
    const bandasjson = JSON.stringify(bands);
    this.server.emit('active_bands', bandasjson);
  }
}
