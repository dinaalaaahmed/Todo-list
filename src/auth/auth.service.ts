import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign }from 'jsonwebtoken'
import { UsersRepository } from '../users/usersReopsitry'
import {AuthDto} from './auth.dto'
import { User } from 'src/models/user.model';
@Injectable()
export class AuthService {
  constructor(private readonly usersRepository : UsersRepository) {}
  async validateUser(id: string): Promise<User|null> {
    return await this.usersRepository.findUserById(id);
    
  }

  async sign(UserDto: AuthDto): Promise<User|null> {
    if(await this.usersRepository.findUserByEmail(UserDto.email)) return null;
    const hash = await bcrypt.hash(UserDto.password, 10);
    await this.usersRepository.createUser(UserDto.email,hash);
    const newUser = await this.usersRepository.findUserByEmail(UserDto.email);
    return newUser;
  }

  async login(UserDto: AuthDto): Promise<User|null> {
    const user = await this.usersRepository.findUserByEmail(UserDto.email);
     if (user) {
      if(await bcrypt.compare(UserDto.password, user.password)) return user;
      return null;
     }
  }

  async token(user: any) {
    return {
      access_token: 'Bearer ' +sign({ id: user._id}, process.env.SECRET_KEY, { expiresIn: '67472347632732h'})
    };
  }
}