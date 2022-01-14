import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { Company } from '@prisma/client';

import db from '../../appDatabase';

import type { CompanyCreateDto, CompanyUpdateDto } from './companyTypes';
import { buildCompanyRo } from './companyHelpers';

export async function listCompanies(userId: string) {
  const companies = await db.company.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return companies.map((company) => buildCompanyRo(company));
}

export async function createNewCompany(payload: CompanyCreateDto) {
  const company = await db.company.create({
    data: {
      ...payload,
    },
  });
  return buildCompanyRo(company);
}

export async function getCompany(company: Company) {
  return buildCompanyRo(company);
}

export async function updateCompany(company: Company, payload: CompanyUpdateDto) {
  const updatedCompany = await db.company.update({
    where: { id: company.id },
    data: payload,
  });
  return buildCompanyRo(updatedCompany);
}

export async function deleteCompany(company: Company) {
  await db.company.delete({ where: { id: company.id } });
}
