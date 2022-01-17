import type { Employee } from '@prisma/client';

import type { EmployeeRo } from './employeeTypes';

/**
 * Build a employee Response Object (RO) with only the fields to be shown to the user
 * Can be used to compute or add extra informations to the employee
 * object, useful for front-end display
 *
 * @param employee The employee object to format
 * @returns A employee Response Object ready to be sent into API responses
 */
export function buildEmployeeRo(employee: Employee): EmployeeRo {
  return {
    id: employee.id,
    userId: employee.userId,
    createdAt: employee.createdAt,
  };
}
