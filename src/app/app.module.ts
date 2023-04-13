import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, validationENV } from './../config/config';
import { chatGateway } from 'src/chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      load: [config],
      isGlobal: true,
      validationSchema: validationENV(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, chatGateway],
})
export class AppModule {}
