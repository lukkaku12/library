import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateBookDto {
    @IsNumber()
    id?:number;

    @IsString()
    name: string;

    @IsString()
    author: string;

    @Transform(({ value }) => parseInt(value)) 
    @IsNumber()
    publicationYear: number;


    @IsString()
    genre: string;

}
