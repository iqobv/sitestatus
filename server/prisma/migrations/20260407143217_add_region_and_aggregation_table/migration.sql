/*
  Warnings:

  - You are about to drop the `ping_results` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatPeriod" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');

-- DropForeignKey
ALTER TABLE "ping_results" DROP CONSTRAINT "ping_results_monitor_id_fkey";

-- AlterTable
ALTER TABLE "monitors" ADD COLUMN     "regions" TEXT[];

-- DropTable
DROP TABLE "ping_results";

-- CreateTable
CREATE TABLE "monitor_logs" (
    "id" BIGSERIAL NOT NULL,
    "monitor_id" UUID NOT NULL,
    "status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "status_code" SMALLINT,
    "response_time_ms" INTEGER NOT NULL,
    "error_message" TEXT,
    "region" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitor_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitor_stats" (
    "id" UUID NOT NULL,
    "monitor_id" UUID NOT NULL,
    "region" VARCHAR(50) NOT NULL,
    "avg_response_ms" INTEGER NOT NULL,
    "uptime_percent" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "period" "StatPeriod" NOT NULL,

    CONSTRAINT "monitor_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "monitor_logs_monitor_id_created_at_idx" ON "monitor_logs"("monitor_id", "created_at");

-- CreateIndex
CREATE INDEX "monitor_stats_monitor_id_timestamp_idx" ON "monitor_stats"("monitor_id", "timestamp");

-- AddForeignKey
ALTER TABLE "monitor_logs" ADD CONSTRAINT "monitor_logs_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_stats" ADD CONSTRAINT "monitor_stats_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
