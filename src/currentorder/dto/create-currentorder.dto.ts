import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateCurrentorderDto {
    @IsArray()
    @IsString({ each: true })
    start_dir: [string, string];

    @IsArray()
    @IsString({ each: true })
    end_dir: [string, string];

    @IsString()
    @IsOptional()
    user_id: string;

    @IsNumber()
    @IsOptional()
    amount: number
}
