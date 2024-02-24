import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);
    const isAuth = await bcrypt.compare(password, user.password);
    if (user && isAuth) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.validateUser(username, password);
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      username: user.username,
      sub: user._id,
      role: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
