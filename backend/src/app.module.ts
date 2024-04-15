import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import getOrmConfig from './config/orm.config';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig()),
    PhotosModule,
    CloudinaryModule,
    AuthModule,
    MulterModule.register({ dest: './uploads' }),
    UsersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
