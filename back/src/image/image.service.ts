import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
// import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Buffer } from 'buffer';
interface ImageData {
  base64: string;
}
@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateImageDto) {
    const base64Image = dto.data.toString('base64');
    return this.prisma.image.create({
      data: {
        name: dto.name,
        data: { base64: base64Image },
      },
    });
  }

  async getImage(id: number) {
    // const MockData = [
    //   {
    //     id: 1,
    //     name: '20250317_13h55m40s_grim.png',
    //     data: {
    //       base64:
    //         'iVBORw0KGgoAAAANSUhEUgAAAEUAAAApCAIAAADs2XNfAAAG/klEQVRoge2aW2xcRxnHv5kz57r3tdde1+vErp0msePaBMUkISFQkJCbUCWkNBI8AEJ94NKG9AVakBBSCw8UKh5aBIIKIXioUMRFiVqUUgEhTtOWOsF168ZZr73ebLx2vOu9nfuZ4SFOsl6v7d1khZOqf52Xs3O+mf9POzPn+2YXEVGBEsnBVribRQBA8TXfuG/bdXj9zNyu4meP4/X2UGd9yHNn60OeO1sfNB5y66EIYyJwhAfMIYwBUD38MEYpUMexLWqbwGit8bfCgwBhUeYE6fYZCKJekaZ10unXeoIqAIzOu6JZqcmNc4ZkGCY1NAashg5rdYAQRxQPwhwAbPOkv7xh/DdTm8cK/lr7AYCwYrb7tKN9lzf5tbKmS1n5Z8Nt0zkxWfDZap4xp8o+a+NBiONdPkAIADpduRc+8aYkw2tz+YsF7yY+5uWKe4JRnkOxDG8j/h/FgQz1+4j5xUj0ZKotrrlv9IMRQwi+2ZsY3DAPALDMbZe7+MLesZNTDU+/1cG5vUYhVyVSDTwIEFE812AAYM6QTk80vDIbsdXLT0WGBh4Y5MT2wJavI06w1QXHVB8+/duZ1Hwy635kazFlyqU8CMGr+9/28M5yklLtj1zdHco++HI/UTx2MVvNxENEVJbkb3uOrPQoJyqcIJd9uFMa/u6hltD2Q5wglTUxymyj8N+Xfvi3+MYT8z30+mILy+Y3uuODkatrmrumE/HQr8YiiSx1DHX1J2vJ3xBe7niLGDv2ab6x/wC1Tcc2LT3vmJptFGzTZAwcS+VlT/+Xnul1j9+AIYi2e9TBlllwaJXXgdZUxKUJkghobbfV8mAilO1mQd7YxEf9G7dhwWWmJ6lRNFIXqaUhRPTkBTM9lXv3leL0+dzYqYFW8fn+IR5TAPAKzuP3xZhDa7qObo75iI2JsKbPatcPR/jS20c3jj16/8Qv/9M4PfRS5NK/0vkFTnTZWg7zIpE9hVSC8Fh1eJfwmo/wLR1KC6jdE5kLuYa0wXcp+dWXzXJ1ufIZi+cIUEuvDw9grvSuYBPwCbzg+Xuq91hnfGTa//to06b3R7qUNC+gZJKe6ThyUen58ZahzTs01CAsjBpxzQMAne4iOJXekq4Qt/vbgDgopJyh58oHB2hX1Il8+eq9dR6El8zMv8y0HxmfPDPf/LnwFAh4e6sOuYmtO/cyYIw6HC/tz89/7/zlC/lm7zuzs5p0PNmTsQQA6HbnWCUe7iNfpaN/ptPnVjLQ48nHispKrTXzlEl1yMFznwGAkXzw9Uyy6PCHPcNz8bisiETgF2ZiioweaVdiuv/Z93vdxBwrBBYjGQCtsO0iX8S5MlKx6XpgVVlCtTyMUrR0ygHAk13ndwbmzi2EPMTc1wfZcfufJ99tCnta2/1tH2+5TylQI/stLYYy5qF/fzKhuQFgNO+t+P2whQQKdtHLwysZGM152Sq0tfIAdWAZT1jUwm7t8x/NZGf1x46efurpnQcf3wEyRj7hmSeHBvbd89mD9wKA47CMKV4LmVBdFdePc+5Fsu8J3Pswmxt33nixfHCGpjQXULNuPI5tkWXb5WghsPtjKvbyAkahsCI3SFx4cYo3Nsse3yLDpRmp6Cxuj0FiRAuuTjlf1hVLT1t/OrbS6JdUb4AYKd1e0yeHCc9LNzMR34ZtFZ9jjC5PqFOmdLgtToK8IOAHDrQrLj76XiY+kfM3yLs+1drW4QUAJ2P97s3ISD54LcRieEp3DQYSwFj11w9i/ZOGy9JVWDXlySbeq3q+MeqYelm+k9Dcfxhu/UpwlgvyAPDrnw6fORUHgGBI+f5ze4MhiVks+g76Y7LjRojN8LSmvHz1nsFAosqRT6TbkoZiGkY15VAN9Sk1NEbLX4S/iG09NeR25kzbZpPjC5t7G/sGwqLMTY4vUNWJv2U/8fYOky1ZeDOW8qPpvrTBV5MZpHTxJ4n7k7pAjfKaoqJqyEdhab1Qqi+0xL62LRoMI+zmACPQqZ02/zra/PxEd9aukKRgxDhg3wmff9AfX2W4E9kNz17ptxlUWS/Ezx6vjQeW1nOlIohu9813unICpld0+fVMU64SSanCRI0IhcdCI51iDpcsDMpQ1PT+fK7viqUkDbH6eq6cB4ty646H1gyrY73NIebDRoaKG0m+R8oAwKgeiFseP2dkqWAaRk31dvzs8SX7gehprCaMAXMM1TH16+chBGF0a2wOQ2lHAoBJyztpeQEYowyoNas71M7e7nmIHGipIZRRaulrJrz/Z93c3xDm5IbIOlqpi27yuMKdeGmRczdqkYfjJW9b9/paqYswACDENWzZxfHiepupgzBCuLF7j+hrWm8n9REWfSEpEF5vG3UTRvg2juTvPJXnO3e11Gzqg/b7Dyr7/8Hdrv8B0dV5JbKPRQ4AAAAASUVORK5CYII=',
    //     },
    //   },
    // ];

    // const MockImage = MockData.find((el) => el.id === id);
    const image = await this.prisma.image.findUnique({ where: { id } });
    const imageData = image.data as unknown as ImageData;
    if (!image) throw new Error('Image not found');

    // if (!MockImage) throw new Error('Image not found');
    return {
      id: image.id,
      name: image.name,
      data: Buffer.from(imageData.base64, 'base64'), // Декодируем обратно в Buffer
    };
  }

  // findAll() {
  //   return `This action returns all image`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} image`;
  // }

  // update(id: number, updateImageDto: UpdateImageDto) {
  //   return `This action updates a #${id} image`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }
}
