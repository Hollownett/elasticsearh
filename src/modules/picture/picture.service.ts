
import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'
import { Model, Types } from 'mongoose'
import { PictureCreateDto } from 'src/common/dto/picture.create.dto'
import { PictureUpdateDto } from 'src/common/dto/picture.update.dto'

import { Picture, PictureSchema } from '../../common/schemas';
import {  PictureSearchService } from './pictureSearch.service'

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(Picture.name) private readonly picture: Model<Picture>,
    private pictureSearchService: PictureSearchService,
  ){}

  async createPicture(picture: PictureCreateDto): Promise<Picture>{
      const createdPicture = new this.picture(picture)
      this.pictureSearchService.indexPicture(createdPicture)
      return createdPicture.save()
  }

  async findAll(): Promise<Picture>{
      return this.picture.find().exec()
  }

  async searchForPictures(text: string) {
    console.log("searchig...")
    const results  = await this.pictureSearchService.search(text);
    // const ids = results.map(result => result.id);
    // if (!ids.length) {
    //   return {
    //     items: [],
    //     count
    //   }
    // }
    // const items = await this.picture.findById();
    return results
  }
}
