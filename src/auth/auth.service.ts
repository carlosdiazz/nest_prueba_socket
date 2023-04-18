import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

//Propio
import { UserService } from 'src/components/user/user.service';
import { CreateUserDto } from 'src/components/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/components/user/entities/user.entity';

import { AuthResponse, payloadTokenInterface } from './types/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<AuthResponse> {
    const { email, password } = loginAuthDto;
    const user = await this.usersService.findByEmailAuth(email);

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw new UnauthorizedException();
    const token = this.generateJwt(user);
    return {
      token,
      user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  generateJwt(user: User) {
    const payload: payloadTokenInterface = { id: user._id, name: user.name };
    return this.jwtService.sign(payload);
  }
}
