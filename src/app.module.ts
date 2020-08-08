import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { TypegooseModule } from "nestjs-typegoose";
import {jwtConstants} from './auth/constants';
import { UsersController } from './users/users.controller';
import { UsersRepositry } from './users/users.service';

@Module({
  imports: [ AuthModule, NotesModule, NotesModule, 
    TypegooseModule.forRoot(jwtConstants.CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
