import { IsNotEmpty, IsString, IsOptional, IsEmail, IsEnum, IsPhoneNumber, IsBoolean, IsDateString } from 'class-validator';
import { CreateProductDTO } from './product.dto';
import { CourseCategoryType } from 'src/type';
// Create New Book
export class CreateCourseDTO extends CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  instructor: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  shortDesc: string;

  @IsEnum(CourseCategoryType, { message: 'Course category type.' })
  courseCategory: CourseCategoryType;
}

export class RegisterCourseDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  whatsappNumber: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  workingWith: string;

  @IsString()
  @IsNotEmpty()
  reasonCourse: string;

  @IsString()
  @IsNotEmpty()
  hearAboutCourse: string;

  @IsBoolean()
  @IsNotEmpty()
  isReadyToAttendCourse: string;

  @IsBoolean()
  @IsNotEmpty()
  isRefundPolicy: string;
}
