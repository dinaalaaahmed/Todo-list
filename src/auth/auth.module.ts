import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from 'src/models/user.model';
import { UsersRepository } from 'src/users/usersReopsitry';
@Module({
  imports: [
    TypegooseModule.forFeature([User])
  ],
  providers: [AuthService, JwtStrategy, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
