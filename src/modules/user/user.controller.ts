import {
  Controller,
  Post,
  Version,
  Body,
  ValidationPipe,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth-guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from './enum/role.enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  @Version('1')
  @ApiOperation({ summary: 'Write user to database.' })
  @ApiResponse({ status: 201 })
  @ApiResponse({
    status: 409,
    description: 'A document with the same username already exists.',
  })
  create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  @Version('1')
  @ApiResponse({ status: 200, type: [CreateUserDto] })
  @ApiOperation({ summary: 'Fetch all user from database.' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  @Version('1')
  @ApiOperation({ summary: 'Fetch user by username  from database.' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Patch(':id')
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  @Version('1')
  @ApiOperation({
    summary: 'Update base stats of user by username in database.',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':username')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Version('1')
  @ApiOperation({ summary: 'Delete user by pokedex number from database.' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('username') username: string): Promise<void> {
    return this.userService.remove(username);
  }
}
