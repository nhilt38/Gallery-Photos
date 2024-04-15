import { Injectable } from '@nestjs/common';
import { Comment } from './comments.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/photos/photos.entity';
import { User } from 'src/users/users.entity';
import { CreateCommentDto } from './dto/create-comment';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(
    { photoId, text }: CreateCommentDto,
    email: string,
  ): Promise<Comment> {
    const photo = await this.photoRepository.findOneBy({ id: photoId });
    const user = await this.userRepository.findOneBy({ email });
    const comment = this.commentRepository.create({
      text,
      photo,
      user,
    });
    return await this.commentRepository.save(comment);
  }
  async readByPhoto(photoId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { photo: await this.photoRepository.findBy({ id: photoId }) },
      relations: ['user'],
    });
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.commentRepository.delete(id);
  }
}
