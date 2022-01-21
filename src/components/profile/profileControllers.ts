import { Profile } from '@prisma/client';

import db from '../../appDatabase';

import type { ProfileUpdateDto } from './profileTypes';
import { buildProfileRo } from './profileHelpers';

export async function listProfiles(userId: string) {
  const profiles = await db.profile.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return profiles.map((profile) => buildProfileRo(profile));
}

export async function updateProfile(profile: Profile, payload: ProfileUpdateDto) {
  const updatedProfile = await db.profile.update({
    where: { id: profile.id },
    data: payload,
  });
  return buildProfileRo(updatedProfile);
}
