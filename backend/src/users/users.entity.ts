import { Comment } from 'src/comments/comments.entity';
import { Photo } from '../photos/photos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', width: 320 })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
