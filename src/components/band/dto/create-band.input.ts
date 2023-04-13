import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

@InputType()
export class CreateBandInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  votes: number;
}
