import { Employee } from '@prisma/client';

import db from '../../appDatabase';

import type { EmployeeCreateDto } from './employeeTypes';
import { buildEmployeeRo } from './employeeHelpers';

export async function listEmployees(userId: string, companyId: string) {
  const employees = await db.employee.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return employees.map((employee) => buildEmployeeRo(employee));
}

export async function createNewEmployee(userId: string, companyId: string, payload: EmployeeCreateDto) {
  const employee = await db.employee.create({
    data: {
      ...payload,
      user: {
        connect: { id: userId },
      },
      company: {
        connect: { id: companyId },
      },
    },
  });
  return buildEmployeeRo(employee);
}

export async function deleteEmployee(employee: Employee) {
  await db.employee.delete({ where: { id: employee.id } });
}
