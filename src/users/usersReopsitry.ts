import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { User } from "../models/user.model";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) 
    private usersModel: ReturnModelType<typeof User>
  ) {}

  async createUser(email, password): Promise<User> {
    const createdUser = new this.usersModel({email: email, password: password, note:[]});
    return await createdUser.save();
  }

  async findUserByEmail(email): Promise<User| null> {
    return await this.usersModel.findOne({email:email},(err, user)=>{
        if(err) return null;
        return user;
    });
  }
  async findUserById(id:String): Promise<User| null> {
    return await this.usersModel.findById(id,(err, user)=>{
        if(err) return null;
        return user;
    });
  }
  async findUserByIdAndAddNote(id, note): Promise<User| null> {
    return await this.usersModel.findByIdAndUpdate(id,{$push:{note:note}},(err, user)=>{
        if(err) return null;
        return user;
    });
      
  }
  async findUserByIdAndRemoveNote(id,note): Promise<User| null> {
    return await this.usersModel.findByIdAndUpdate(id,{ $pull: { note: note } },(err, user)=>{
        if(err) return null;
        return user;
    });
      
  }
}
