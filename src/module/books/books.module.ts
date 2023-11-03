import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksServices } from './books.service';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  controllers: [BooksController],
  providers: [BooksServices, PrismaService],
})
export class BooksModule {}
