import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ReturnArticleDto } from './dto/return-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  // @Post('by-ids')
  // async getArticlesByIds(@Body() updateIdsDto: ReturnArticleDto) {
  //   return this.articleService.getArticlesByIds(updateIdsDto.ids);
  // }

  // @Get()
  // async getArticles() {
  //   return this.articleService.getAllArticles();
  // }

  // @Get(':id')
  // async getArticleById(@Param('id') id: string) {
  //   return this.articleService.getArticleById(Number(id));
  // }

  // @Post()
  // async createArticle(@Body() dto: CreateArticleDto) {
  //   return this.articleService.createArticle(dto);
  // }

  // @Delete(':id')
  // async deleteArticle(@Param('id') id: string) {
  //   return this.articleService.deleteArticle(Number(id));
  // }
}
