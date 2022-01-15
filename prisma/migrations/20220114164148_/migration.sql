/*
  Warnings:

  - Added the required column `fst_name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "fst_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;
