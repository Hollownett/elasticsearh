import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Picture, PictureSchema } from '../../common/schemas';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PictureSearchResult, PictureSearchBody, PictureCountResult } from './types';

@Injectable()
export class PictureSearchService { 
  index = 'pictures'

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPicture(picture: Picture) {
    return this.elasticsearchService.index<PictureSearchResult, PictureSearchBody>({
      index: this.index,
      body: {
        name: picture.name,
        price: picture.price,
        author: picture.author
      }
    })
  }

  async count(query: string, fields: string[]) {
    const { body } = await this.elasticsearchService.count<PictureCountResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query,
            fields
          }
        }
      }
    })
    return body.count;
  }
  
  async search(text: string) {
    const { body } = await this.elasticsearchService.search<PictureSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
          }
        }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
   
        
  async remove(postId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: postId,
          }
        }
      }
    })
  }

  async update(picture: Picture) {
    const newBody: PictureSearchBody = {
      name: picture.name,
      price: picture.price,
      author: picture.author
    }

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            name: picture.name,
          }
        },
        script: {
          inline: script
        }
      }
    })
  }
}