import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

//Propio
import { AuthService } from '../auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { config } from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import { payloadTokenInterface } from '../types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(config.KEY) configService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JWT.JWT_SECRET,
    });
  }

  async validate(payload: payloadTokenInterface): Promise<any> {
    //TODO devolver el user
    return { userId: payload.id, name: payload.name };
  }
}
