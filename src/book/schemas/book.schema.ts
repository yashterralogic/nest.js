import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  // @Prop()
  // price: number;

  // @Prop()
  // category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
