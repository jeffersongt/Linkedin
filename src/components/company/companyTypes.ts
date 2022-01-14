import {
  IsEmail, IsOptional, IsString, MinLength, MaxLength,
} from 'class-validator';

import { Ro } from '../../appRo';

export class CompanyCreateDto {
  @IsString()
  name! : string;

  @IsString()
  domain!: string;

  @IsString()
  adress!: string;
}

export class CompanyUpdateDto {
}

export interface CompanyRo extends Ro {
  id: string;
  createdAt: Date;
}
