/*
  Warnings:

  - You are about to drop the column `ends_at` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `started_at` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "ends_at",
DROP COLUMN "started_at";
