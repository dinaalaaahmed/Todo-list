import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from 'src/models/user.model';
import { NotesController } from './notes.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
],
providers: [NotesService, UsersService],
controllers: [NotesController],
})
export class NotesModule {}
