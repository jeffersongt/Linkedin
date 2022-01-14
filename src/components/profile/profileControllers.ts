import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { Profile } from '@prisma/client';

import db from '../../appDatabase';

import type { ProfileCreateDto, ProfileUpdateDto } from './profileTypes';
import { buildProfileRo } from './profileHelpers';

export async function listProfiles(userId: string) {
  const profiles = await db.profile.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return profiles.map((profile) => buildProfileRo(profile));
}

export async function createNewProfile(userId: string, payload: ProfileCreateDto) {
  const profile = await db.profile.create({
    data: {
      ...payload,
      user: {
        connect: { id: userId },
      },
    },
  });
  return buildProfileRo(profile);
}

export async function getProfile(profile: Profile) {
  return buildProfileRo(profile);
}

export async function updateProfile(profile: Profile, payload: ProfileUpdateDto) {
  const updatedProfile = await db.profile.update({
    where: { id: profile.id },
    data: payload,
  });
  return buildProfileRo(updatedProfile);
}

export async function deleteProfile(profile: Profile) {
  await db.profile.delete({ where: { id: profile.id } });
}
