import { IsNumber, IsString } from 'class-validator';

export class GetUserByNickDto {
  @IsString()
  nick_name: string;
}

export class GetUserByIdDto {
  @IsNumber()
  id: number;
}
