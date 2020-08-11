import { IsString, IsEmail, IsDefined } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsString()
    @IsDefined()
    email: string;
    @IsString()
    @IsDefined()
    password: string;
}