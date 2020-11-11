import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PictureCreateDto } from 'src/common/dto/picture.create.dto';
import { PictureUpdateDto } from 'src/common/dto/picture.update.dto';
import { Picture } from 'src/common/schemas';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get()
  async findAll(
    @Query('search') search: string
  ): Promise<any>{
      if(search){
          return this.pictureService.searchForPictures(search)
      }
    return this.pictureService.findAll();
  }

  @Post()
  async create(
    @Body() picture: PictureCreateDto,
  ): Promise<Picture> {
   return this.pictureService.createPicture(picture)
  }
  
}
