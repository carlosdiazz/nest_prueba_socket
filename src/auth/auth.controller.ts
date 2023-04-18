import { Controller, Post, Body } from '@nestjs/common';

//Propio
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

import { CreateUserDto } from 'src/components/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  register(@Body() createUserDro: CreateUserDto) {
    return this.authService.register(createUserDro);
  }
}
