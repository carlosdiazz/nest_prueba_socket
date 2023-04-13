import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//Propio
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';

@Injectable()
export class BandService {
  constructor(@InjectModel(Band.name) private bandModel: Model<Band>) {}

  async create(createBandInput: CreateBandInput): Promise<Band> {
    try {
      const newBand = new this.bandModel(createBandInput);
      return await newBand.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error?.message);
    }
  }

  async findAll(): Promise<Band[]> {
    return await this.bandModel.find().exec();
  }

  async findOne(id: string): Promise<Band> {
    const band = await this.bandModel.findById(id);
    if (!band) {
      throw new NotFoundException();
    }
    return band;
  }

  async update(id: string, updateBandInput: UpdateBandInput): Promise<Band> {
    throw new BadGatewayException(); //TODO
  }

  async addVote(id: string): Promise<Band> {
    try {
      return await this.bandModel
        .findByIdAndUpdate(id, { $inc: { votes: 1 } }, { new: true })
        .exec();
    } catch (error) {
      console.log(`ERROR => ${error}`);
    }
  }

  async remove(id: string): Promise<Band> {
    await this.findOne(id);

    return await this.bandModel.findByIdAndDelete(id);
  }
}
