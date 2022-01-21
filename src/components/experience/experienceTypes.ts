import {
  IsOptional, IsString,
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
  @IsString()
  position!: string;

  @IsString()
  city!: string;

  @IsOptional()
  company!: string;
}

export interface ExperienceRo extends Ro {
  id: string;
  userId: string;
  createdAt: Date;
  position: string;
  city: string;
  company: string;
}
