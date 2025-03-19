import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ArticleModule } from './article/article.module';
import { PrismaService } from './prisma/prisma.service';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    // ArticleModule
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
