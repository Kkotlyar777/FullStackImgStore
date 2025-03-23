import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { Response } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH = 1;
  REFRESG_TOKEN_NAME = 'refreshToken';
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService
  ) {}
  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Email or passord invalid');
    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('Email or passord invalid');
    return user;
  }

  async login(dto: AuthDto) {
    // eslint-disable-next-line
    const { password, ...user } = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }
  async register(dto: AuthDto) {
    const oldUser = await this.userService.getUserByEmail(dto.email);
    if (oldUser) throw new BadRequestException('User already exists');
    // eslint-disable-next-line
    const { password, ...user } = await this.userService.create(dto);

    const tokens = await this.issueTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');
    // eslint-disable-next-line
    const { password, ...user } = await this.userService.getUserById(result.id);

    const tokens = await this.issueTokens(user.id, user.role);
    return { user, ...tokens };
  }

  private async issueTokens(userId: number, role?: Role) {
    const data = { id: userId, role };
    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });
    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  addRefreshTokenResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH);
    res.cookie(this.REFRESG_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }
  removeRefreshTokenResponse(res: Response) {
    res.cookie(this.REFRESG_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
