import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';


import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from 'src/models/user.model';
import { UsersRepositry } from 'src/users/users.service';
@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000000h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersRepositry],
  controllers: [AuthController],
})
export class AuthModule {}
