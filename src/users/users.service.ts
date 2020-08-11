import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { User } from "../models/user.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { AuthDto } from "src/auth/auth.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) 
    private usersRepository: ReturnModelType<typeof User>
  ) {}

  async create(createUserDto: AuthDto): Promise<User> {
    const createdUser = new this.usersRepository(createUserDto);
    return await createdUser.save();
  }

  async findOne(item): Promise<User| null> {
    return await this.usersRepository.findOne(item,(err, user)=>{
        if(err) return null;
        return user;
    });
  }
  async findOneAndUpdate(item,update): Promise<User| null> {
    return await this.usersRepository.findOneAndUpdate(item,update,(err, user)=>{
        if(err) return null;
        return user;
    });
      
  }
}
