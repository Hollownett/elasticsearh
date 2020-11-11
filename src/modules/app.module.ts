import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PictureModule } from './picture/picture.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/pictures`, {
      useFindAndModify: false,
      connectionName: 'gallery',
    }),PictureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
