import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nick_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true }) // Каждый элемент массива - число
  @Type(() => Number) // Преобразование входных данных в число
  image_id_list?: number[];
}
