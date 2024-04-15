import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photos.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), UsersModule, CloudinaryModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
