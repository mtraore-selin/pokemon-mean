import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/modules/user/enum/role.enum';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
