import { Injectable } from '@nestjs/common';
import { ReturnModelType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { UsersService } from "../users/users.service";

import { InjectModel } from "nestjs-typegoose";
import { Typegoose } from 'typegoose';
@Injectable()
export class NotesService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly usersService: UsersService
  ) {}
    async createNote(id: string, note:string): Promise<any> {
    const user = await this.usersService.findOneAndUpdate({_id:id},{$push:{note:note}});
    return user;
    }
    async getNotes(id: string): Promise<any> {
        const user = await this.usersService.findOne({_id:id});
        if(user){
            if(user.note) return user.note;
            else return []
        }
        return 0;
        
    }
    async removeNotes(id: string, note:string): Promise<any> {
        return await this.usersService.findOneAndUpdate({_id:id},{ $pull: { note: note } });
        
        
    }
}
