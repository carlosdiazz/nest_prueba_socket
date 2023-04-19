import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

//Propio

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const responseAuthorization = client.handshake.headers.authorization;
    try {
      if (!responseAuthorization) {
        throw new UnauthorizedException('NO HAY TOKEN');
      }
      const [, token] = responseAuthorization.split(' ');
      this.authService.validateJwtToken(token);
      return true;
    } catch (error) {
      console.log(error);
      client.disconnect();
      return false;
    }
  }
}
