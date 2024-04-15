import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    const user = await this.service.findByEmail(req.user.email);
    return user;
  }
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.service.create(dto);
    if (!user) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    return user;
  }
}
