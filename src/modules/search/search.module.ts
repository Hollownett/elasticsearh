import {Module} from '@nestjs/common'
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
    imports: [ElasticsearchModule.register({
      node: 'https://09ebf97735af4a7cbc3bdd5f40e4f0cf.eu-central-1.aws.cloud.es.io:9243',
    })],
    exports: [ElasticsearchModule]
  })
  export class SearchModule {}