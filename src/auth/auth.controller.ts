import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
} from '@nestjs/common';

//Propio
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

import { CreateUserDto } from 'src/components/user/dto/create-user.dto';
import { AuthResponse, payloadTokenInterface } from './types/types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/components/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginAuthDto): Promise<AuthResponse> {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  register(@Body() createUserDro: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(createUserDro);
  }

  @Get('renew')
  @UseGuards(JwtAuthGuard)
  renewToken(
    @CurrentUser() user: payloadTokenInterface,
  ): Promise<AuthResponse> {
    return this.authService.renewToken(user);
  }
}
