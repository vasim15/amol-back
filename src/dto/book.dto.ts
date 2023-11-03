// src/books/dto/create-book.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl, IsEmail, minLength, MinLength, IsInt, IsEnum, IsArray } from 'class-validator';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

export enum Edition {
  english = 'english',
  hindi = 'hindi',
}
// Create New Book
export class CreateBookDTO extends CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  aboutAuthor: string;

  @IsOptional()
  @IsString()
  shortDesc: string;

  @IsOptional()
  @IsString()
  ISPN: string;

  @IsInt()
  @IsNotEmpty()
  pageCount: number;

  @IsArray()
  edition: string[];
}

// Update Book
export class UpdateBookDTO extends UpdateProductDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  aboutAuthor: string;

  @IsOptional()
  @IsString()
  shortDesc: string;

  @IsOptional()
  @IsString()
  ISPN: string;

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  pageCount: number;

  @IsArray()
  @IsOptional()
  edition: string[];
}

// Create New order
export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
