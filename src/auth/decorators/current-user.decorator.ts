import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/components/user/entities/user.entity';
import { payloadTokenInterface } from '../types/types';

export const CurrentUser = createParamDecorator(
  (roles: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    if (!user) throw new InternalServerErrorException('User not request');
    return request.user as payloadTokenInterface;
  },
);
