import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT || 9999, () => {
    console.log(
      `👍El MICROSERVICIO - WEBSCRAPING esta arriba en el puerto: ${
        process.env.PORT || 9999
      } 👍💪`,
    );
  });
}
bootstrap();
