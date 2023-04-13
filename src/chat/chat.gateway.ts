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
export class chatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly bandsService: BandService) {}

  @WebSocketServer()
  server: Server;

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
    this.verBands(client);
  }

  async verBands(client: Socket) {
    console.log('Entro accccca');
    const bands = await this.bandsService.findAll();
    const bandasjson = JSON.stringify(bands);
    client.emit('active_bands', bandasjson);
  }
}
