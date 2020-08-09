import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { TypegooseModule } from "nestjs-typegoose";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ AuthModule, NotesModule, NotesModule, ConfigModule.forRoot(),
    TypegooseModule.forRoot(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
