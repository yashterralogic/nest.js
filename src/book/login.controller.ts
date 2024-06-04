

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './login.service';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  async createBook(
    @Body() book: Book,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  // @Get(':id')
  // async getBook(
  //   @Param('id') id: string,
  // ): Promise<Book> {
  //   return this.bookService.findById(id);
  // }

  // @Put(':id')
  // async updateBook(
  //   @Param('id') id: string,
  //   @Body() book: Book,
  // ): Promise<Book> {
  //   return this.bookService.updateById(id, book);
  // }

  // @Delete(':id')
  // async deleteBook(
  //   @Param('id') id: string,
  // ): Promise<Book> {
  //   return this.bookService.deleteById(id);
  // }
}
