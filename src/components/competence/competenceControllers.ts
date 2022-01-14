import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { Competence } from '@prisma/client';

import db from '../../appDatabase';

import type { CompetenceCreateDto, CompetenceUpdateDto } from './competenceTypes';
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

export async function updateCompetence(competence: Competence, payload: CompetenceUpdateDto) {
  const updatedCompetence = await db.competence.update({
    where: { id: competence.id },
    data: payload,
  });
  return buildCompetenceRo(updatedCompetence);
}

export async function deleteCompetence(competence: Competence) {
  await db.competence.delete({ where: { id: competence.id } });
}
