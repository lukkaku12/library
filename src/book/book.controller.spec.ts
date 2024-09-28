import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from '../api-key/api-key.guard';


describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
        {
            provide: ApiKeyGuard,
            useValue: {} // Aquí puedes proporcionar un valor simulado si es necesario
          },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        name: 'A Guide to NestJS',
        author: 'Kamil Myśliwiec',
        publicationYear: 2021,
        genre: 'guide',
      };

      mockBookService.create.mockResolvedValue(createBookDto);

      const result = await controller.create(createBookDto);
      expect(result).toEqual(createBookDto);
      expect(mockBookService.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = [
        { id: 1, name: 'Book 1', author: 'Author 1' },
        { id: 2, name: 'Book 2', author: 'Author 2' },
      ];

      mockBookService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockBookService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const bookId = 1;
      const result = { id: bookId, name: 'A Guide to NestJS', author: 'Kamil Myśliwiec', publicationYear: 2021, genre: 'guide' };

      mockBookService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(bookId)).toEqual(result);
      expect(mockBookService.findOne).toHaveBeenCalledWith(bookId);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
        const bookId = 1;

        // Objeto completo para la actualización
        const updateBookDto: UpdateBookDto = {
            id: bookId,
            name: 'Updated Book Name',
            author: 'Kamil Myśliwiec',
            publicationYear: 2021,
            genre: 'guide'
        };

        const result = { affected: 1 }; // Simula el resultado de la actualización

        mockBookService.update.mockResolvedValue(result);

        expect(await controller.update(bookId.toString(), updateBookDto)).toEqual(result);
        expect(mockBookService.update).toHaveBeenCalledWith(bookId, updateBookDto);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const bookId = 1;
      const result = { affected: 1 }; // Simula el resultado de la eliminación

      mockBookService.remove.mockResolvedValue(result);

      expect(await controller.remove(bookId)).toEqual(result);
      expect(mockBookService.remove).toHaveBeenCalledWith(bookId);
    });
  });
});