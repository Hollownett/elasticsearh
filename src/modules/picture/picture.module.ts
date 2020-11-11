import { Module } from '@nestjs/common'
import { PictureController } from './picture.controller'
import { PictureService } from './picture.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SearchModule } from '../search/search.module';
import { Picture, PictureSchema } from '../../common/schemas'
import { PictureSearchService } from './pictureSearch.service';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Picture.name, schema: PictureSchema }], 'gallery'),
      SearchModule
  ],
  controllers: [PictureController],
  providers: [PictureService, PictureSearchService],
})
export class PictureModule {}
