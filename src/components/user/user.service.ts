import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//Propio
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MESSAGE } from 'src/config/MESSAGE';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string) {
    const emailCheck = await this.userModel.findOne({ email: email });
    if (emailCheck) {
      throw new BadRequestException('ESTE CORREO EXISTE');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.findByEmail(createUserDto.email);
    try {
      const newUser = new this.userModel(createUserDto);
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPassword;
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return user;
  }

  async findByEmailAuth(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      console.log('Entroo aqui');
      throw new UnauthorizedException();
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    //return `This action updates a #${id} user`;
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  async remove(id: string): Promise<User> {
    //return `This action removes a #${id} user`;
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }
}
