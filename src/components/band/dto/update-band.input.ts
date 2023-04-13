import { CreateBandInput } from './create-band.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBandInput extends PartialType(CreateBandInput) {
  @Field(() => Int)
  id: string;
}
