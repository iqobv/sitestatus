/*
  Warnings:

  - You are about to drop the column `country` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "country",
ADD COLUMN     "browser" TEXT,
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
