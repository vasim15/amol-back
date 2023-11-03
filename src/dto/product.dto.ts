import { IsString, IsInt, IsOptional, IsArray, IsNotEmpty, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { ProductCategoryType } from 'src/type';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsNotEmpty()
  @IsEnum(ProductCategoryType, { message: 'Invalid category  type.' })
  category: ProductCategoryType;

  @IsNotEmpty()
  availability: string;
}

export class UpdateProductDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  ratingValue: number;

  @IsOptional()
  @IsNumber()
  reviewCount: number;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(ProductCategoryType, { message: 'Invalid category  type.' })
  category: ProductCategoryType;

  @IsNotEmpty()
  @IsOptional()
  availability: string;
}
