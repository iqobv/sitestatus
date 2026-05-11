/*
  Warnings:

  - Changed the type of `type` on the `global_notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('MAINTENANCE', 'UPDATE', 'NEWS', 'INCIDENT', 'RESOLVED', 'DIRECT_MESSAGE');

-- AlterTable
ALTER TABLE "global_notifications" DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- DropEnum
DROP TYPE "GlobalNotificationType";

-- DropEnum
DROP TYPE "PersonalNotificationType";
