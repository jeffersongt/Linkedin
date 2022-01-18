import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { Employee } from '@prisma/client';

import db from '../../appDatabase';

import type { EmployeeCreateDto, EmployeeUpdateDto } from './employeeTypes';
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

export async function getEmployee(employee: Employee) {
  return buildEmployeeRo(employee);
}

export async function updateEmployee(employee: Employee, payload: EmployeeUpdateDto) {
  const updatedEmployee = await db.employee.update({
    where: { id: employee.id },
    data: payload,
  });
  return buildEmployeeRo(updatedEmployee);
}

export async function deleteEmployee(employee: Employee) {
  await db.employee.delete({ where: { id: employee.id } });
}
