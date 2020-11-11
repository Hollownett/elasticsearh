import {PictureSearchBody} from './PictureSearchBody.interface';

interface PictureSearchResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _source: PictureSearchBody;
    }>;
  };
}

export { PictureSearchResult }