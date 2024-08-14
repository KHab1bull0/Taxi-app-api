import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SignupUserDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
// fullname  String
//   email     String   @unique
//   password  String
//   phone     String
//   avatarUrl String
//   status    Status 
