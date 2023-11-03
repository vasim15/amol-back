import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsBoolean, IsDateString } from 'class-validator';

export class RegisterContestDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  whatsappNumber: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  contestAbout: string;

  @IsBoolean()
  @IsNotEmpty()
  isBook: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isRefundPolicy: boolean;
}
