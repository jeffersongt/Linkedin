import {
  IsEmail, IsOptional, IsString, MinLength, MaxLength,
} from 'class-validator';

import { Ro } from '../../appRo';

export class ExperienceCreateDto {
  company_id!: undefined;

  @IsString()
  position!: string;

  started_at!: Date;

  @IsOptional()
  ends_at!: Date;

  @IsString()
  city!: string;

  @IsOptional()
  company!: string;
}

export class ExperienceUpdateDto {
}

export interface ExperienceRo extends Ro {
  id: string;
  userId: string;
  createdAt: Date;
}
