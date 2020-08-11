import { Injectable } from '@nestjs/common';
import { UsersRepository } from "../users/usersReopsitry";
import { User } from 'src/models/user.model';

@Injectable()
export class NotesService {
  constructor(
    private readonly usersRepositry: UsersRepository
  ) {}
  async createNote(id: string, note:string): Promise<User|null> {
    return await this.usersRepositry.findUserByIdAndAddNote(id,note);
  }
  async getNotes(id: string): Promise<String[]|null> {
    const user = await this.usersRepositry.findUserById(id);
    if(user){
      if(user.note) return user.note;
      return []
    }
    return null; 
  }
  async removeNotes(id: string, note:string): Promise<User> {
    return await this.usersRepositry.findUserByIdAndRemoveNote(id, note);
  }
 
}
