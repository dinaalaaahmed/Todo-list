import {
  Controller,
  Get, 
  Request, 
  Post, 
  UseGuards,
  Body, 
  ForbiddenException,
  NotAcceptableException,
  Param,
  NotFoundException,
  Query
 } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/signUp')
  async signUp(@Request() req,     
               @Body() authDto: AuthDto  
             ){
    const user = await this.authService.sign(authDto.email, authDto.password);
    console.log(user)
    if(user){
      return await this.authService.token(user);
    }
    else{
      return new ForbiddenException();
    }
  }
  @Post('auth/login')
  async login(@Request() req, @Body() authDto: AuthDto){
    const user = await this.authService.login(authDto.email, authDto.password);
    if(user){
      return await this.authService.token(user);
    }
    else{
      return new ForbiddenException();
    }
    
  }


}