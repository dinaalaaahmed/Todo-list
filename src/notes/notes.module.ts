import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from 'src/models/user.model';
import { NotesController } from './notes.controller';
import { UsersRepository } from 'src/users/usersReopsitry';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
],
providers: [NotesService, UsersRepository],
controllers: [NotesController],
})
export class NotesModule {}
