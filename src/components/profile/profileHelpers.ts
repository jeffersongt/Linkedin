import type { Profile } from '@prisma/client';

import type { ProfileRo } from './profileTypes';

/**
 * Build a profile Response Object (RO) with only the fields to be shown to the user
 * Can be used to compute or add extra informations to the profile
 * object, useful for front-end display
 *
 * @param profile The profile object to format
 * @returns A profile Response Object ready to be sent into API responses
 */
export function buildProfileRo(profile: Profile): ProfileRo {
  return {
    id: profile.id,
    userId: profile.userId,
    createdAt: profile.createdAt,
    fst_name: profile.fst_name,
    last_name: profile.last_name,
    city: profile.city,
    position: profile.position,
    company: profile.company,
  };
}
