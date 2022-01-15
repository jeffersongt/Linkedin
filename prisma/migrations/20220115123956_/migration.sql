/*
  Warnings:

  - You are about to drop the column `company_id` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `company` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_company_id_fkey";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "company_id",
ADD COLUMN     "company" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "company_id",
ADD COLUMN     "company" TEXT NOT NULL;
