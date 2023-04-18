import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      //forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

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
