import { Competence } from '@prisma/client';

import db from '../../appDatabase';

import type { CompetenceCreateDto } from './competenceTypes';
import { buildCompetenceRo } from './competenceHelpers';

export async function listCompetences(userId: string) {
  const competences = await db.competence.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return competences.map((competence) => buildCompetenceRo(competence));
}

export async function createNewCompetence(userId: string, payload: CompetenceCreateDto) {
  const competence = await db.competence.create({
    data: {
      ...payload,
      user: {
        connect: { id: userId },
      },
    },
  });
  return buildCompetenceRo(competence);
}

export async function getCompetence(competence: Competence) {
  return buildCompetenceRo(competence);
}

export async function deleteCompetence(competence: Competence) {
  await db.competence.delete({ where: { id: competence.id } });
}
