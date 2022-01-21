import {
  IsString,
} from 'class-validator';

import { Ro } from '../../appRo';

export class ProfileCreateDto {
  @IsString()
  fst_name!: string;

  @IsString()
  last_name!: string;

  @IsString()
  city!: string;

  @IsString()
  position!: string;

  @IsString()
  company!: string;
}

export class ProfileUpdateDto {
  @IsString()
  fst_name!: string;

  @IsString()
  last_name!: string;

  @IsString()
  city!: string;

  @IsString()
  position!: string;

  @IsString()
  company!: string;
}

export interface ProfileRo extends Ro {
  id: string;
  userId: string;
  createdAt: Date;
  fst_name: string;
  last_name: string;
  city: string;
  position: string;
  company: string;
}
