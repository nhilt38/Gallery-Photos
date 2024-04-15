import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  photoId: number;

  @ApiProperty()
  text: string;
}
