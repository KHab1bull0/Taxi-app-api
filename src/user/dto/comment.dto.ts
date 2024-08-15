import { IsNumber, IsString } from "class-validator";


export class CommentDto {
    @IsNumber()
    score: number;

    @IsString()
    comment: string;
}
