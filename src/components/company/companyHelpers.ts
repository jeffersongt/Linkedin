import type { Company } from '@prisma/client';

import type { CompanyRo } from './companyTypes';

/**
 * Build a company Response Object (RO) with only the fields to be shown to the user
 * Can be used to compute or add extra informations to the company
 * object, useful for front-end display
 *
 * @param company The company object to format
 * @returns A company Response Object ready to be sent into API responses
 */
export function buildCompanyRo(company: Company): CompanyRo {
  return {
    id: company.id,
    createdAt: company.createdAt,
  };
}
