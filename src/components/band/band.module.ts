import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandResolver } from './band.resolver';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Band, BandSchema } from './entities/band.entity';
import { BandGateway } from './band.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Band.name,
        schema: BandSchema,
      },
    ]),
    AuthModule,
    UserModule,
  ],
  providers: [BandResolver, BandService, BandGateway],
  exports: [BandService],
})
export class BandModule {}
