import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

//Propio
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ParseObjectIdPipe } from 'src/common/parse-object-idMongo.pipe';
import { JwyAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwyAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
