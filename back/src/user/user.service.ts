import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.prisma.$transaction(async (prisma) => {
      const existingUserEmail = await prisma.user.findUnique({
        where: { email: dto.email },
      });
      const existingUserNickName = await prisma.user.findUnique({
        where: { nick_name: dto.nick_name },
      });

      if (existingUserEmail) {
        throw new ConflictException('User with this email already exists');
      }
      if (existingUserNickName) {
        throw new ConflictException('User with this nick_name already exists');
      }
      return await this.prisma.user.create({
        data: {
          image_id_list: dto.image_id_list,
          avatar_url: dto?.avatar_url,
          password: dto.password,
          nick_name: dto.nick_name,
          email: dto.email,
        },
      });
    });
  }
  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getUserByNick(nick_name: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { nick_name } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
