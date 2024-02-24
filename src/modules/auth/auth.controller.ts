import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Signin' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.authenticate(loginDto);
  }
}
