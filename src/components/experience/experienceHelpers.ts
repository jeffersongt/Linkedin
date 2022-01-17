import type { Experience } from '@prisma/client';

import type { ExperienceRo } from './experienceTypes';

/**
 * Build a experience Response Object (RO) with only the fields to be shown to the user
 * Can be used to compute or add extra informations to the experience
 * object, useful for front-end display
 *
 * @param experience The experience object to format
 * @returns A experience Response Object ready to be sent into API responses
 */
export function buildExperienceRo(experience: Experience): ExperienceRo {
  return {
    id: experience.id,
    userId: experience.userId,
    createdAt: experience.createdAt,
    position: experience.position,
  };
}
