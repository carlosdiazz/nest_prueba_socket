import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateBandInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  @MinLength(3)
  name: string;
}
