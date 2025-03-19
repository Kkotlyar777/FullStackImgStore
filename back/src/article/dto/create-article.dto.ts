import { IsInt, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  publisher_logo_url: string;

  @IsString()
  title: string;

  @IsInt()
  story_id: number;

  @IsString()
  publisher_name: string;

  @IsInt()
  publisher_id: number;
}
