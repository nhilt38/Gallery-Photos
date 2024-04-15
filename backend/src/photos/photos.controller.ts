import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Request,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { GetPhotoOptions } from './dto/get-photo';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photoService: PhotosService,
    private readonly userService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('')
  async getAll(@Query() options: GetPhotoOptions) {
    return this.photoService.readAll(options);
  }

  @Get(':photoId')
  async getOne(@Param() params: any) {
    return this.photoService.readSingle(params.photoId);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadSingle(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('uploading file to cloudinary', file.originalname);
    let ret = await this.cloudinaryService.uploadFile(file).catch((e) => {
      console.log('error while uploading photo', file, e);
    });
    if (!ret) {
      return null;
    }
    const photo = await this.photoService.create({
      name: file.originalname,
      description: '',
      url: ret.url,
      views: 0,
      isPublished: false,
      user: await this.userService.findByEmail(req.user.email),
    });
    console.log('upload complete', photo);
    return photo;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('photos[]', 10))
  async uploadMultiple(
    @Request() req,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      await Promise.all(files.map((file) => this.uploadSingle(req, file)));
      console.log('Upload files complete ', files.length);
    } else {
      console.log('No files uploaded');
    }
  }
}
