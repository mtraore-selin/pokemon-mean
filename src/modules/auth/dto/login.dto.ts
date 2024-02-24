import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Username.', example: 'Momo' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: 'User password.', example: 'Momoqdqsdq' })
  readonly password: string;
}
