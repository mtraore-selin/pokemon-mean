import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'staging')
          .default('development'),
        PORT: Joi.number().default(3000),
        MONGO_DB_URL: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    PokemonModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
