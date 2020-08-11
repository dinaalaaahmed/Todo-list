import { Injectable } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { sign }from 'jsonwebtoken'
import { ReturnModelType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { InjectModel } from "nestjs-typegoose";
import { UsersService } from '../users/users.service'
import passport from 'passport';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly usersService: UsersService

  ) {}

 
  async validateUser(id: string): Promise<any> {
    return await this.usersService.findOne({id:id});
    
  }
  async sign(email: string, pass: string): Promise<any> {
    const shcema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().required()
    });
    const valid = shcema.validate({email:email, password:pass});
    
    const isExist= await this.usersService.findOne({email:email});
    console.log(isExist)
    if (valid.error||isExist)
    return 0;
    const hash = await bcrypt.hash(pass, 10);
    const user = await new this.userModel({email:email, password:hash, note:[]});
    await user.save();
    const u = await this.usersService.findOne({email: email});
    return u;
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({email:email});
    console.log("user",user)
     if (user) {
      if(await bcrypt.compare(pass, user.password)) return user;
      return 0;
     }
  }

  async token(user: any) {
    console.log(user._id)
    const payload = {id:user._id};
    
    return {
      access_token: 'Bearer ' +sign(payload, jwtConstants.secret, { expiresIn: '67472347632732h'}),
    };
  }
}