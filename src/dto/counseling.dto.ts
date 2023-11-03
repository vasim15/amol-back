import { IsNotEmpty, IsString, IsOptional, IsEmail, IsEnum, IsPhoneNumber, IsBoolean, IsDateString } from 'class-validator';

export class RegisterCounselingDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @IsString()
  @IsNotEmpty()
  motherName: string;

  @IsBoolean()
  @IsNotEmpty()
  isTakenPermission: boolean;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  counsellingArea: string;

  @IsString()
  @IsNotEmpty()
  describeWords: string;

  @IsBoolean()
  @IsNotEmpty()
  isRefundPolicy: boolean;
}
