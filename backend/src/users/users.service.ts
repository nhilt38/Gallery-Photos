import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { RegisterUserDto } from './dto/register';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  async create(data: RegisterUserDto): Promise<User> {
    const exist = await this.repository.existsBy({ email: data.email });
    if (exist) {
      return null;
    }
    const salt = await genSalt();
    data.password = await hash(data.password, salt);
    const user = this.repository.create(data);
    return this.repository.save(user);
  }
  async readSingle(id: number): Promise<User> {
    return await this.repository.findOneBy({ id });
  }
  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }
  async readAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find(options);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
