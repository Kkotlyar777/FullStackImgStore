import { IsArray, IsInt, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class ReturnArticleDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[];
}
