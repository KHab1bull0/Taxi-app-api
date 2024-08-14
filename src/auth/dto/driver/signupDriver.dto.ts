import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


enum Status {
    inactive = "inactive",
    active = "active"
}

const nol = 0

export class SignupDriverDto {
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

    @IsString()
    @IsOptional()
    avatarUrl: string;

    @IsEnum(Status)
    status: Status = Status.inactive

    @IsNumber()
    rating: number = 0;

    @IsString()
    @IsNotEmpty()
    car_name: string;

    @IsString()
    @IsNotEmpty()
    car_model: string;

    @IsString()
    @IsNotEmpty()
    car_type: string;
}

// fullname  String
// email     String   @unique
// password  String
// phone     String
// avatarUrl String
// rating    Int      @default(0)
// status    Status   @default(inactive)
// car_model String
// car_name  String
// car_type  String