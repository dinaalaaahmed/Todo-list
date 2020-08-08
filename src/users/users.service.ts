import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { User } from "../models/user.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { AuthDto } from "src/auth/auth.dto";

@Injectable()
export class UsersRepositry {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) {}

  async create(createUserDto: AuthDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOne(item): Promise<User| null> {
    return await this.userModel.findOne(item,(err, user)=>{
        if(err) return 0;
        return user;
    });
  }
  async findOneAndUpdate(item,update): Promise<User| null> {
    return await this.userModel.findByIdAndUpdate(item,update,(err, user)=>{
        if(err) return 0;
        return user;
    });
      
  }
}
