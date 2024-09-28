import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;
  
  // Definir el mock de un libro y una lista de libros para las pruebas
  const placeholderBook = {
    id: 1,
    name: 'A Guide to NestJS',
    author: 'Kamil Myśliwiec',
    publicationYear: 2021,
    genre: 'guide',
  };
  
  const mockBooks = [
    { id: 1, name: 'Book 1', author: 'Author 1', publicationYear: 2000, genre: 'Fiction' },
    { id: 2, name: 'Book 2', author: 'Author 2', publicationYear: 2005, genre: 'Non-Fiction' },
  ];

  // Mock del repositorio
  const mockBookRepository = {
    find: jest.fn().mockResolvedValue(mockBooks),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      return id === 1 ? placeholderBook : null;
    }),
    save: jest.fn().mockResolvedValue(placeholderBook),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  // Test para verificar que el servicio está definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test para la función "create"
  describe('create', () => {
    it('should create a new book registry', async () => {
      const response = await service.create(placeholderBook);
      expect(response).toEqual(placeholderBook);
    });

    it('should throw an error if any field is missing', async () => {
      const invalidBook = { ...placeholderBook, name: null };
      await expect(service.create(invalidBook)).rejects.toThrow(HttpException);
    });
  });

  // Test para la función "findAll"
  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockBooks);
    });
  });

  // Test para la función "findOne"
  describe('findOne', () => {
    it('should return a book by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({
        id: 1,
        name: 'A Guide to NestJS',
        author: 'Kamil Myśliwiec',
        publicationYear: 2021,
        genre: 'guide',
      });
    });

    it('should throw an error if the book is not found', async () => {
      mockBookRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(HttpException);
    });
  });

  // Test para la función "update"
  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto = {
        id: 1,
        name: 'Updated Book Name',
        author: 'Updated Author',
        publicationYear: 2022,
        genre: 'Updated Genre',
      };
  
      const result = await service.update(1, updateBookDto);
      expect(result.affected).toEqual(1); // Verificamos que 1 fila fue afectada
    });

    it('should throw an error if book data is invalid', async () => {
      jest.spyOn(mockBookRepository, 'update').mockRejectedValue({ affected: 0 })
      const invalidUpdate = {}; // Sin campos para que pase por el condicional de datos inválidos
      await expect(service.update(1, invalidUpdate)).rejects.toThrow(HttpException);
    });
  });

  // Test para la función "remove"
  describe('remove', () => {
    it('should remove a book by id', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({});
    });

    it('should throw an error if the book is not found', async () => {
      mockBookRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow(Error);
    });
  });
});