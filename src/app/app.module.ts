import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, validationENV } from './../config/config';
import { BandModule } from './../components';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      load: [config],
      isGlobal: true,
      validationSchema: validationENV(),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,

      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    MongooseModule.forRoot(process.env.URI_MONGO),
    BandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
