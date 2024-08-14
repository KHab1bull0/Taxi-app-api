import { IsEnum, IsString } from "class-validator";

enum Status {
    inactive = 'inactive',
    active = 'active'
}

export class SignupAdminDto {

    @IsString()
    fullname: string;

    @IsString()
    email: string;

    @IsString()
    password: string

    @IsEnum(Status)
    status: Status = Status.inactive;

}