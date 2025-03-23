import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { OnlyAdminGuard } from '../guards/admin.guard';

export const Auth = (role: Role = Role.USER) =>
  role === Role.ADMIN
    ? applyDecorators(UseGuards(JwtAuthGuard, OnlyAdminGuard))
    : applyDecorators(UseGuards(JwtAuthGuard));
