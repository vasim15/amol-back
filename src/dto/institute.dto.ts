import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstitute {
  @IsNotEmpty()
  @IsString()
  instituteName: string;

  @IsNotEmpty()
  @IsString()
  centerCode: string;
}
