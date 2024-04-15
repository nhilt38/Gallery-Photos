import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
