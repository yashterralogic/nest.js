import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './login.controller';
import { BookService } from './login.service';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
