import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BandService } from './band.service';
import { Band } from './entities/band.entity';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { ParseObjectIdPipe } from 'src/common/parse-object-idMongo.pipe';
import { BandGateway } from './band.gateway';

@Resolver(() => Band)
export class BandResolver {
  constructor(
    private readonly bandService: BandService,
    private readonly bandGateway: BandGateway,
  ) {}

  @Mutation(() => Band, {
    name: 'createBand',
    description: 'Para crear un nuevo Band',
  })
  async createBand(@Args('createBandInput') createBandInput: CreateBandInput) {
    const newBand = await this.bandService.create(createBandInput);
    this.bandGateway.emitirBands();
    return newBand;
  }

  @Query(() => [Band], { name: 'allBands', description: 'Ver todas las Bands' })
  async findAll(): Promise<Band[]> {
    return this.bandService.findAll();
  }

  @Query(() => Band, {
    name: 'findBand',
    description: 'Buscar una Band especifica',
  })
  async findOne(
    @Args('id', { type: () => String }, ParseObjectIdPipe) id: string,
  ): Promise<Band> {
    return this.bandService.findOne(id);
  }

  @Mutation(() => Band, {
    name: 'updateBand',
    description: 'Actualizar una Band',
  })
  async updateBand(
    @Args('updateBandInput') updateBandInput: UpdateBandInput,
  ): Promise<Band> {
    return this.bandService.update(updateBandInput.id, updateBandInput);
  }

  @Mutation(() => Band, {
    name: 'removeBand',
    description: 'Eliminar una Band',
  })
  async removeBand(
    @Args('id', { type: () => String }, ParseObjectIdPipe) id: string,
  ): Promise<Band> {
    return this.bandService.remove(id);
  }
}
