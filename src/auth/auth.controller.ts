import {
  Controller,
  Post, 
  Body, 
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/signUp')
  async signUp(@Body() authDto: AuthDto){

    const user = await this.authService.sign(authDto);
    if(user) return await this.authService.token(user);
      return new ForbiddenException();
  }

  @Post('auth/login')
  async login(@Body() authDto: AuthDto){
    const user = await this.authService.login(authDto);
    if(user) return await this.authService.token(user);
    return new ForbiddenException();
  }


}