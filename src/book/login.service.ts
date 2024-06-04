


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async create(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedBook) {
      throw new NotFoundException('Book not found.');
    }

    return updatedBook;
  }

  async deleteById(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();

    if (!deletedBook) {
      throw new NotFoundException('Book not found.');
    }

    return deletedBook;
  }
}
