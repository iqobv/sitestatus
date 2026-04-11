/*
  Warnings:

  - You are about to drop the column `p95_response_ms` on the `monitor_stats` table. All the data in the column will be lost.
  - You are about to drop the `monitor_accidents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "monitor_accidents" DROP CONSTRAINT "monitor_accidents_monitor_id_region_id_fkey";

-- DropForeignKey
ALTER TABLE "monitor_accidents" DROP CONSTRAINT "monitor_accidents_trigger_log_id_fkey";

-- AlterTable
ALTER TABLE "monitor_stats" DROP COLUMN "p95_response_ms";

-- DropTable
DROP TABLE "monitor_accidents";

-- CreateTable
CREATE TABLE "monitor_incidents" (
    "id" UUID NOT NULL,
    "monitor_id" UUID NOT NULL,
    "region_id" UUID NOT NULL,
    "trigger_log_id" BIGINT,
    "error_message" TEXT,
    "status_code" INTEGER,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolved_at" TIMESTAMP(3),
    "alert_triggered" BOOLEAN NOT NULL DEFAULT false,
    "alert_sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_incidents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "monitor_incidents_monitor_id_idx" ON "monitor_incidents"("monitor_id");

-- AddForeignKey
ALTER TABLE "monitor_incidents" ADD CONSTRAINT "monitor_incidents_trigger_log_id_fkey" FOREIGN KEY ("trigger_log_id") REFERENCES "monitor_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_incidents" ADD CONSTRAINT "monitor_incidents_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions"("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE;
