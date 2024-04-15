import { User } from '../users/users.entity';
import { Comment } from '../comments/comments.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: 'Default description' })
  description: string;

  @Column()
  url: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.photo)
  comments: Comment[];
}
