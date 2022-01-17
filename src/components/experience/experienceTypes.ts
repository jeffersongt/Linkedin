import {
  IsEmail, IsOptional, IsString, MinLength, MaxLength,
} from 'class-validator';

import { Ro } from '../../appRo';

export class ExperienceCreateDto {
  @IsString()
  position!: string;

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
  position: string;
}
