import { Experience } from '@prisma/client';

import db from '../../appDatabase';

import type { ExperienceCreateDto, ExperienceUpdateDto } from './experienceTypes';
import { buildExperienceRo } from './experienceHelpers';

export async function listExperiences(userId: string) {
  const experiences = await db.experience.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return experiences.map((experience) => buildExperienceRo(experience));
}

export async function createNewExperience(userId: string, payload: ExperienceCreateDto) {
  const experience = await db.experience.create({
    data: {
      ...payload,
      user: {
        connect: { id: userId },
      },
    },
  });
  return buildExperienceRo(experience);
}

export async function getExperience(experience: Experience) {
  return buildExperienceRo(experience);
}

export async function updateExperience(experience: Experience, payload: ExperienceUpdateDto) {
  const updatedExperience = await db.experience.update({
    where: { id: experience.id },
    data: payload,
  });
  return buildExperienceRo(updatedExperience);
}

export async function deleteExperience(experience: Experience) {
  await db.experience.delete({ where: { id: experience.id } });
}
