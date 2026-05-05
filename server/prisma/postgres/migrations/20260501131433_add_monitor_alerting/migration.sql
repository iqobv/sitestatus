-- CreateEnum
CREATE TYPE "ChannelStatus" AS ENUM ('PENDING', 'VERIFIED');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('EMAIL');

-- AlterEnum
ALTER TYPE "TokenType" ADD VALUE 'EMAIL_ALERT_VERIFICATION';

-- CreateTable
CREATE TABLE "alert_settings" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "project_id" UUID,
    "monitor_id" UUID,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "on_down" BOOLEAN NOT NULL DEFAULT true,
    "on_up" BOOLEAN NOT NULL DEFAULT true,
    "delay_minutes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alert_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_channels" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "ChannelType" NOT NULL DEFAULT 'EMAIL',
    "status" "ChannelStatus" NOT NULL DEFAULT 'PENDING',
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChannelToSettings" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ChannelToSettings_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChannelToSettings_B_index" ON "_ChannelToSettings"("B");

-- AddForeignKey
ALTER TABLE "alert_settings" ADD CONSTRAINT "alert_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_settings" ADD CONSTRAINT "alert_settings_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_settings" ADD CONSTRAINT "alert_settings_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_channels" ADD CONSTRAINT "notification_channels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToSettings" ADD CONSTRAINT "_ChannelToSettings_A_fkey" FOREIGN KEY ("A") REFERENCES "alert_settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToSettings" ADD CONSTRAINT "_ChannelToSettings_B_fkey" FOREIGN KEY ("B") REFERENCES "notification_channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
