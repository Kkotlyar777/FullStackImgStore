import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
// import { CreateImageDto } from './dto/create-image.dto';
// import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new Error('Файл не загружен');
    }
    return this.imageService.create({
      name: file.originalname,
      data: file.buffer,
    });
  }

  @Get(':id')
  async getImage(@Param('id') id: string) {
    const image = await this.imageService.getImage(Number(id));

    return {
      id: image.id,
      name: image.name,
      data: image.data.toString('base64'), // Отправляем как base64
    };
  }
}
