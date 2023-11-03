// src/books/dto/create-book.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEmail, ValidateIf, IsInt, IsEnum, IsBoolean } from 'class-validator';
import { GenderType, UserRoleType } from 'src/type';

export class UserLogin {
  @ValidateIf((obj) => !obj.mobileNumber)
  @IsNotEmpty({ message: 'At least one of email, or Google ID is required.' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  // @ValidateIf((obj) => !obj.mobileNumber)
  @IsOptional()
  @IsNotEmpty({ message: 'At least one of email, or Google ID is required.' })
  @IsString({ message: 'Google ID must be a string.' })
  google_id: string;

  @ValidateIf((obj) => obj.role !== UserRoleType.ADMIN && !obj.google_id)
  @IsNotEmpty({ message: 'Mobile number is required.' })
  @IsString({ message: 'Mobile number must be a string.' })
  mobileNumber: string;

  @IsNotEmpty({ message: 'Role is required.' })
  @IsEnum(UserRoleType, { message: 'Select role type' })
  role: string;

  @ValidateIf((obj) => obj.role === UserRoleType.ADMIN)
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}

export class UserRegister {
  @IsNotEmpty({ message: 'First Name is required.' })
  @IsString({ message: 'First Name must be a string.' })
  firstName: string;

  @IsNotEmpty({ message: ' Last Name is required.' })
  @IsString({ message: ' Last Name must be a string.' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Mobile number is required.' })
  @IsString({ message: 'Mobile number must be a string.' })
  mobileNumber: string;

  @IsNotEmpty({ message: 'Gender is required.' })
  @IsEnum(GenderType, { message: 'select gender type' })
  gender: GenderType;

  @IsNotEmpty({ message: 'Preparing is required.' })
  @IsString({ message: 'Preparing must be a string.' })
  preparing: string;

  @IsNotEmpty({ message: 'Studying In is required.' })
  @IsString({ message: 'Studying In must be a string.' })
  studyingIn: string;

  @IsNotEmpty({ message: 'School name is required.' })
  @IsString({ message: 'School name must be a string.' })
  schoolName: string;

  @IsNotEmpty({ message: 'Role is required.' })
  @IsEnum(UserRoleType, { message: 'Invalid role target type.' })
  role: UserRoleType;

  @IsNotEmpty({ message: 'Date of birth is required.' })
  @IsString({ message: 'Date of birth must be .' })
  dob: string;

  @IsNotEmpty({ message: 'Terms and Condition is required' })
  @IsBoolean({ message: 'Terms and Condition must be .' })
  isTermsChecked: boolean;
}

export class UserRegisterViaGoogle {
  @IsNotEmpty({ message: 'Google ID is required.' })
  @IsString({ message: 'Google ID must be a string.' })
  google_id: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'First Name is required.' })
  @IsString({ message: 'First Name must be a string.' })
  firstName: string;

  @IsNotEmpty({ message: ' Last Name is required.' })
  @IsString({ message: ' Last Name must be a string.' })
  lastName: string;

  @IsNotEmpty({ message: 'Mobile number is required.' })
  @IsString({ message: 'Mobile number must be a string.' })
  mobileNumber: string;

  @IsNotEmpty({ message: 'Gender is required.' })
  @IsEnum(GenderType, { message: 'select gender type' })
  gender: GenderType;

  @IsNotEmpty({ message: 'Preparing is required.' })
  @IsString({ message: 'Preparing must be a string.' })
  preparing: string;

  @IsNotEmpty({ message: 'Studying In is required.' })
  @IsString({ message: 'Studying In must be a string.' })
  studyingIn: string;

  @IsNotEmpty({ message: 'School name is required.' })
  @IsString({ message: 'School name must be a string.' })
  schoolName: string;

  @IsNotEmpty({ message: 'Role is required.' })
  @IsEnum(UserRoleType, { message: 'Invalid role target type.' })
  role: UserRoleType;

  @IsNotEmpty({ message: 'Date of birth is required.' })
  @IsString({ message: 'Date of birth must be .' })
  dob: string;

  @IsNotEmpty({ message: 'Terms and Condition is required' })
  @IsBoolean({ message: 'Terms and Condition must be .' })
  isTermsChecked: boolean;
}

export class OtpRequest {
  // @IsNotEmpty({ message: 'Email is required.' })
  // @IsEmail({}, { message: 'Invalid email address.' })
  // email: string;

  @IsNotEmpty({ message: 'Mobile Number is required.' })
  mobileNumber: string;

  @IsNotEmpty({ message: 'OTP is required.' })
  @IsNumber({}, { message: 'Invalid OTP.' })
  otp: number;
}

export class ResetPassword {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsNotEmpty({ message: 'New Password is required.' })
  @IsString({ message: 'New Password is required.' })
  password: string;

  @IsNotEmpty({ message: 'Old Password is required.' })
  @IsString({ message: 'Old Password is required.' })
  oldPassword: string;
}

export class AccountStatusCheck {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  // @IsOptional({})
  // @IsNotEmpty({ message: 'Google id is required.' })
  // @IsString({ message: 'Google Id must be in a string' })
  // google_id: string;
}
