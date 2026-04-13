-- DropForeignKey
ALTER TABLE "monitor_accidents" DROP CONSTRAINT "monitor_accidents_trigger_log_id_fkey";

-- AlterTable
ALTER TABLE "monitor_accidents" ALTER COLUMN "trigger_log_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "monitor_accidents" ADD CONSTRAINT "monitor_accidents_trigger_log_id_fkey" FOREIGN KEY ("trigger_log_id") REFERENCES "monitor_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
