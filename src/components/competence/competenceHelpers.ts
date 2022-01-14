import type { Competence } from '@prisma/client';

import type { CompetenceRo } from './competenceTypes';

/**
 * Build a competence Response Object (RO) with only the fields to be shown to the user
 * Can be used to compute or add extra informations to the competence
 * object, useful for front-end display
 *
 * @param competence The competence object to format
 * @returns A competence Response Object ready to be sent into API responses
 */
export function buildCompetenceRo(competence: Competence): CompetenceRo {
  return {
    id: competence.id,
    userId: competence.userId,
    createdAt: competence.createdAt,
  };
}
