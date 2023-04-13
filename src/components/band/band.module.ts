import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandResolver } from './band.resolver';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Band, BandSchema } from './entities/band.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Band.name,
        schema: BandSchema,
      },
    ]),
  ],
  providers: [BandResolver, BandService],
  exports: [BandService],
})
export class BandModule {}
