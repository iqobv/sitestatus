-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "channel_id" UUID;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "notification_channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
