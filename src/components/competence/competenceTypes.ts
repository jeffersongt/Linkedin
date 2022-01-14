import { 
  IsEmail, IsOptional, IsString, MinLength, MaxLength,
} from 'class-validator';

import { Ro } from '../../appRo';

export class CompetenceCreateDto {
  @IsString()
  name!: string;
}

export class CompetenceUpdateDto {
}

export interface CompetenceRo extends Ro {
  id: string;
  userId: string;
  createdAt: Date;
}
