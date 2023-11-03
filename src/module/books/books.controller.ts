import { Controller, Post, Delete, Put, Get, Param, Body } from '@nestjs/common';
import { BooksServices } from './books.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDTO, UpdateBookDTO } from 'src/dto/book.dto';
import { async } from 'rxjs';
@ApiTags('Book')
@Controller('book')
export class BooksController {
  constructor(private booksService: BooksServices) {}

  // Get Al Books
  @Get('/all')
  async getBooks() {
    return await this.booksService.getAllBooks();
  }

  // Get all books orders
  @Get('/orders/list')
  async getAllOrderData() {
    return await this.booksService.getAllOrderData();
  }

  // Create New Book
  @Post('/create')
  createBook(@Body() createBook: CreateBookDTO) {
    return this.booksService.createBook(createBook);
  }

  // Delete  Book Id
  @Delete('/:bookId')
  removeBook(@Param('bookId') bookId: string) {
    return this.booksService.removeBook(bookId);
  }

  // Get Enroll List  via ID
  @Post('/create/order')
  createBookOrder(@Body() bookOrder: any) {
    return this.booksService.createBookOrder(bookOrder);
  }

  // Update via ID
  @Put('/:bookId')
  updateBook(@Param('bookId') bookId: string, @Body() bookData: UpdateBookDTO) {
    return this.booksService.updateBook(bookId, bookData);
  }

  // Get via ID
  @Get('/:bookId')
  getBookViaId(@Param('bookId') bookId: string) {
    return this.booksService.getBookViaId(bookId);
  }
}
