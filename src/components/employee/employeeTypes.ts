import { } from 'class-validator';

import { Ro } from '../../appRo';

export class EmployeeCreateDto {
  company!: string;
}

export class EmployeeUpdateDto {
}

export interface EmployeeRo extends Ro {
  id: string;
  userId: string;
  createdAt: Date;
}
