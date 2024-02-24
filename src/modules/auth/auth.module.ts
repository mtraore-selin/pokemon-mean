import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'key12345!!',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
