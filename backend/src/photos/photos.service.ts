import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photos.entity';
import { DeleteResult, Repository } from 'typeorm';
import { GetPhotoOptions } from './dto/get-photo';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}

  async create(photoData: Partial<Photo>): Promise<Photo> {
    const photo = this.photoRepository.create(photoData);
    return await this.photoRepository.save(photo);
  }
  async readSingle(id: number): Promise<Photo> {
    return await this.photoRepository.findOneBy({ id });
  }
  async readAll(options?: GetPhotoOptions): Promise<Photo[]> {
    console.log('get all picture with options', options);
    return this.photoRepository.find({
      skip: options?.skip,
      take: options?.take,
    });
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.photoRepository.delete(id);
  }
}
