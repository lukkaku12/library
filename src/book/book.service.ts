import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book> ) {

  }
  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      if (createBookDto.author || createBookDto.name || createBookDto.genre || createBookDto.publicationYear) {
        throw new HttpException('INVALID BOOK DATA:', HttpStatus.BAD_REQUEST)
      }

      const response = await this.bookRepository.save(createBookDto);
      return response;
      
    } catch (error) {
      throw new HttpException('ERROR CREATING A BOOK REGISTRY:' + error, HttpStatus.BAD_REQUEST)
      
    }
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    try {
      const response = await this.bookRepository.findOne({where:{id}});
      if (!response) throw new HttpException('BOOK NOT FOUND', HttpStatus.BAD_REQUEST)
      
    } catch (error) {
      throw new HttpException('ERROR FINDING THE BOOK REQUESTED', HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateBookDto: Partial<UpdateBookDto>) {
    try {
      if (updateBookDto.author || updateBookDto.name || updateBookDto.genre || updateBookDto.publicationYear) {
        throw new HttpException('INVALID BOOK DATA:', HttpStatus.BAD_REQUEST)
      }

      const response = await this.bookRepository.update(id, updateBookDto);

      return response;
      
    } catch (error) {
      throw new HttpException('ERROR UPDATING BOOK DATA:', HttpStatus.BAD_REQUEST)
      
    }


  }

  async remove(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } }); // Busca el libro por ID
    // tambien se puede usar por un id con delete en vez de remove.
    if (!book) {
      throw new Error('Book not found'); // Manejar el caso cuando no se encuentra el libro
    }
    return await this.bookRepository.remove(book); // Elimina la entidad
  }
}
