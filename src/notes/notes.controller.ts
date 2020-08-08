import { Controller, Get, Request, Post, UseGuards,Body, Delete, Put, ForbiddenException, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesDto } from './notes.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Put('add')
  async addNote(@Request() req, @Body() notesDto: NotesDto  ){
    const user = await this.notesService.createNote(req.user.id,notesDto.note);
    if(user){
        return {success:200};
    }
    else{
      return new ForbiddenException();
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('remove')
  async deleteNote(@Request() req, @Body() notesDto: NotesDto){
    
    const user = await this.notesService.removeNotes(req.user.id,notesDto.note);
    if(user){
        return {success:200};
    }
    else{
      return new ForbiddenException();
    }
    
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  async getNote(@Request() req){
    console.log(req.user.id)
    const user = await this.notesService.getNotes(req.user.id);
    if(user){
        return user;
    }
    else{
      return new NotFoundException();
    }
  }
}