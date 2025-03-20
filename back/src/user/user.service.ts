import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        image_id_list: dto.image_id_list,
        avatar_url: dto?.avatar_url,
        password: dto.password,
        nick_name: dto.nick_name,
        email: dto.email,
      },
    });
  }
  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async getUserByNick(nick_name: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { nick_name } });
  }
}
