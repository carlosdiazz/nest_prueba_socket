import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

//PROPIO
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { config } from 'src/config/config';
import { UserModule } from 'src/components';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.JWT.JWT_SECRET,
          signOptions: {
            expiresIn: configService.JWT.JWT_EXPIRE,
          },
        };
      },
    }),
    UserModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
