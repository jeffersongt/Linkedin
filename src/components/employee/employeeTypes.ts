import { } from 'class-validator';

import { Ro } from '../../appRo';

export class EmployeeCreateDto {
}

export class EmployeeUpdateDto {
}

export interface EmployeeRo extends Ro {
  id: string;
  userId: string;
  createdAt: Date;
}
