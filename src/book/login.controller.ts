
import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookService } from './login.service';
import { Book } from './schemas/book.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { Response } from 'express';
import * as Joi from 'joi';

@Controller('signup')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  @Post()
  async createBook(
    @Body() bookData: { fullname: string; email: string; password: string },
    @Res() res: Response,
  ): Promise<Response> {
    const { fullname, email, password } = bookData;

   
    const schema = Joi.object({
      fullname: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ fullname, email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        data: [],
      });
    }

    try {
     
      const findByEmail = async (email: string): Promise<Book[] | null> => {
        return this.bookModel.find({ email }).exec();
      };

console.log(findByEmail, "findByEmailfindByEmailfindByEmail" )
      const existingUser = await findByEmail(email);
      console.log(existingUser, "existingUserexistingUserexistingUserexistingUserexistingUser" )
      if (existingUser.length>0) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered',
          data: [],
        });
      }


      const hashedPassword = await bcrypt.hash(password, 10);

     
      const book = { fullname, email, password: hashedPassword };

      const randomNum = Math.floor(1000 + Math.random() * 9000);


      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Account Verification Code for Popial',
        text: `Your verification code is: ${randomNum}`,
      };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail(mailOptions);

      const createdBook = await this.bookService.create(book);

  
      const expiresIn = 3600;
      const token = jwt.sign({ fullname }, process.env.SECRET_KEY, { expiresIn });

      return res.json({
        success: true,
        message: 'Account created successfully',
        fullname: createdBook.fullname,
        email: createdBook.email,
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Failed to create the account',
        data: [],
      });
    }
  }
}
