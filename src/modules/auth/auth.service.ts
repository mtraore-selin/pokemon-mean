import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { IAuthenticate } from './interfaces/user.interface';
import { sign } from 'jsonwebtoken';

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

  // async authenticate(authenticateDto: LoginDto): Promise<IAuthenticate> {
  async authenticate(authenticateDto: LoginDto): Promise<IAuthenticate> {
    const { username, password } = authenticateDto;

    const userAuth = await this.validateUser(username, password);
    if (!userAuth) throw new UnauthorizedException('Invalid credentials');

    const user = {
      username: userAuth.username,
      role: userAuth.roles[0],
    };
    const token = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_SECRET,
    });

    return { token, user };
    // return token;
  }
}
