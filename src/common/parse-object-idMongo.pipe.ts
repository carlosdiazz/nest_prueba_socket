import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { isMongoId } from 'class-validator';

export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value)) {
      throw new BadRequestException('Invalid Id');
    }
    return value;
  }
}
