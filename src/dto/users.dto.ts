// src/books/dto/create-book.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsInt, IsMobilePhone, IsEnum, IsBoolean } from 'class-validator';
import { GenderType, UserRoleType } from 'src/type';

// Create New User
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty({ message: 'Gender is required.' })
  @IsEnum(GenderType, { message: 'select gender type' })
  gender: GenderType;

  @IsNotEmpty({ message: 'Role is required.' })
  @IsEnum(UserRoleType, { message: 'Invalid role target type.' })
  role: UserRoleType;

  @IsString()
  mobileNumber: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsNotEmpty({ message: 'Terms and Condition is required' })
  @IsBoolean({ message: 'Terms and Condition must be .' })
  isTermsChecked: boolean;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;
}

export class CreateUserAddress {
  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsMobilePhone()
  mobileNumber: string;

  @IsOptional()
  @IsMobilePhone()
  telNumber: string;
}

export class UpdateUserAddress {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address2: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsNotEmpty()
  @IsMobilePhone()
  mobileNumber: string;

  @IsOptional()
  @IsMobilePhone()
  telNumber: string;
}
