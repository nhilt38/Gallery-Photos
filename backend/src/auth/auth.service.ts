import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.UNAUTHORIZED);
    }
    delete user.password;
    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.validatePassword(password)) {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }
    return {
      access_token: this.jwtService.sign({
        id: user.email,
        sub: user.id,
      }),
    };
  }
}
