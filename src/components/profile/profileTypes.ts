import {
  IsEmail, IsOptional, IsString, MinLength, MaxLength,
} from 'class-validator';

import { Ro } from '../../appRo';

export class ProfileCreateDto {
  @IsString()
  city!: string;

  @IsString()
  position!: string;

  @IsString()
  company_id!: undefined;

  @IsOptional()
  company!: string;
}

export class ProfileUpdateDto {
}

export interface ProfileRo extends Ro {
  id: string;
  userId: string;
  createdAt: Date;
}
