import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('Se inicia cuando inicia el servicio de Socket');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Se ejecuta cuando alguien se conecta al server');
    this.server.emit('nuevo_mensaje', 'Dame luz');
  }

  handleDisconnect(client: Socket) {
    console.log('Se ejecuta cuando alguien se desconecta');
  }

  @SubscribeMessage('nuevo_mensaje')
  handleMessage(client: Socket, payload: any) {
    console.log(payload);
    //this.server.emit('mensaje', 'hola');
    //this.server.emit('nuevo_mensaje', 'Dame luz');
    client.emit('nuevo_mensaje', 'DEBE LLEGARTE');
    client.broadcast.emit('nuevo_mensaje', 'NO DEBE LLEGARTE');
  }
}
