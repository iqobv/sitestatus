-- CreateEnum
CREATE TYPE "GlobalNotificationType" AS ENUM ('MAINTENANCE', 'UPDATE', 'NEWS');

-- CreateEnum
CREATE TYPE "PersonalNotificationType" AS ENUM ('INCIDENT', 'RESOLVED', 'DIRECT_MESSAGE');

-- CreateTable
CREATE TABLE "global_notification_reads" (
    "id" UUID NOT NULL,
    "global_notification_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_notification_reads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_notifications" (
    "id" UUID NOT NULL,
    "type" "GlobalNotificationType" NOT NULL,
    "is_app_notification" BOOLEAN NOT NULL DEFAULT false,
    "is_email_notification" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "action_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "PersonalNotificationType" NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "is_app_notification" BOOLEAN NOT NULL DEFAULT false,
    "is_email_notification" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "action_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "global_notification_reads_global_notification_id_user_id_key" ON "global_notification_reads"("global_notification_id", "user_id");

-- AddForeignKey
ALTER TABLE "global_notification_reads" ADD CONSTRAINT "global_notification_reads_global_notification_id_fkey" FOREIGN KEY ("global_notification_id") REFERENCES "global_notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_notification_reads" ADD CONSTRAINT "global_notification_reads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
