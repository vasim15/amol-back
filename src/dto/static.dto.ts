// static-page.dto.ts

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStaticPageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateStaticPageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;
}
