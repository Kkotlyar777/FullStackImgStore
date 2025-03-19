import { Injectable } from '@nestjs/common';
// import { ReturnArticleDto } from './dto/return-article.dto';
// import { ArticleModel } from './article.model';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Article } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  // Получить все статьи
  // async getAllArticles(): Promise<Article[]> {
  //   return this.prisma.article.findMany();
  // }

  // // Найти статью по ID
  // async getArticleById(id: number): Promise<Article | null> {
  //   return this.prisma.article.findUnique({ where: { id } });
  // }
  // // Найти статью по массиву ID
  // async getArticlesByIds(ids: number[]): Promise<Article[]> {
  //   return this.prisma.$queryRaw<Article[]>`
  //   SELECT * FROM "Article" WHERE "id" = ANY(${ids})`;
  //   // .article.findMany({
  //   //   where: { id: { in: ids } },
  //   // });
  // }

  // // Создать статью
  // async createArticle(
  //   data: Omit<Article, 'id' | 'createdAt'>
  // ): Promise<Article> {
  //   return this.prisma.article.create({ data });
  // }

  // // Удалить статью
  // async deleteArticle(id: number): Promise<Article> {
  //   return this.prisma.article.delete({ where: { id } });
  // }
}
