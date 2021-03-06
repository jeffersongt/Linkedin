import {
  IsString,
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
  @IsString()
  name! : string;

  @IsString()
  domain!: string;

  @IsString()
  adress!: string;
}

export interface CompanyRo extends Ro {
  id: string;
  createdAt: Date;
  name: string;
  domain: string;
  adress: string;
}
