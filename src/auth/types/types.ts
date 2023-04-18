import { User } from 'src/components/user/entities/user.entity';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface payloadTokenInterface {
  id: string;
  name: string;
  iat?: number;
  exp?: number;
}
