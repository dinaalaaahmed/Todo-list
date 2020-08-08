import { Injectable } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { sign }from 'jsonwebtoken'
import { ReturnModelType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { InjectModel } from "nestjs-typegoose";
import { UsersRepositry } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly usersRepositry: UsersRepositry

  ) {}

 
  async validateUser(id: string): Promise<any> {
    return await this.usersRepositry.findOne({id:id});
    
  }
  async sign(email: string, pass: string): Promise<any> {
    const shcema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().required()
    });
    const valid = shcema.validate({email:email, password:pass});
    
    const isExist= await this.usersRepositry.findOne({email:email});
    console.log(isExist)
    if (valid.error||isExist)
    return 0;
    const hash = await bcrypt.hash(pass, 10);
    const user = await new this.userModel({email:email, password:hash, note:[]});
    await user.save();
    const u = await this.usersRepositry.findOne({email: email});
    return u;
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersRepositry.findOne({email:email});
     if (user) {
      return await bcrypt.compare(pass, user.password);
     }
  }

  async token(user: any) {

    const payload = {id:user._id};
    return {
      access_token: 'Bearer ' +sign(payload, jwtConstants.secret, { expiresIn: '67472347632732h'}),
    };
  }
}