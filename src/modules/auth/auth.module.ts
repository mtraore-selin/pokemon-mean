import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      privateKey: 'key12345', //todo
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
