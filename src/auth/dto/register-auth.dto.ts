import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  online: boolean;
}
