import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto, GetUserByNickDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('getById')
  async getUserById(@Body() dto: GetUserByIdDto) {
    return this.userService.getUserById(Number(dto.id));
  }
  @Post('getByNick')
  async getUserByNick(@Body() dto: GetUserByNickDto) {
    return this.userService.getUserByNick(dto.nick_name);
  }
}
