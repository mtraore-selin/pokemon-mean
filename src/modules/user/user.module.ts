import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [
    UserService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
