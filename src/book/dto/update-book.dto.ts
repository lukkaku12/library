import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBookDto extends PartialType(CreateBookDto) {
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
