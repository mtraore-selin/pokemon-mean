import { Role } from './../enum/role.enum';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'Username number.', example: 'Momo' })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'MyPassword!',
  })
  password: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  @IsOptional()
  @ApiProperty({
    description: 'User role',
    example: [Role.User],
  })
  roles: Role[];
}
