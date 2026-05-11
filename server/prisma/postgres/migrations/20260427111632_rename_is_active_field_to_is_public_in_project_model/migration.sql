/*
  Warnings:

  - You are about to drop the column `is_active` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "is_active",
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;
