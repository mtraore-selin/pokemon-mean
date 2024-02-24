import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Username.', example: 'Momo' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'User password.', example: 'Momoqdqsdq' })
  password: string;
}
