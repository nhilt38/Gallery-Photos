import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create-comment';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async post(@Request() req, @Body() dto: CreateCommentDto) {
    const comment = this.service.create(dto, req.user.email);
    return comment;
  }
  @Get(':photoId')
  async get(@Param() params: any) {
    return this.service.readByPhoto(params.photoId);
  }
}
