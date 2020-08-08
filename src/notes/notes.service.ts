import { Injectable } from '@nestjs/common';
import { ReturnModelType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { UsersRepositry } from "../users/users.service";

import { InjectModel } from "nestjs-typegoose";
import { Typegoose } from 'typegoose';
@Injectable()
export class NotesService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly usersRepositry: UsersRepositry
  ) {}
    async createNote(id: string, note:string): Promise<any> {
    const user = await this.usersRepositry.findOneAndUpdate({_id:id},{$push:{note:note}});
    return user;
    }
    async getNotes(id: string): Promise<any> {
        const user = await this.usersRepositry.findOne({_id:id});
        if(user){
            if(user.note) return user.note;
            else return []
        }
        return 0;
        
    }
    async removeNotes(id: string, note:string): Promise<any> {
        return await this.usersRepositry.findOneAndUpdate({_id:id},{ $pull: { note: note } });
        
        
    }
}
