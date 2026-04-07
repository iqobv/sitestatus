/*
  Warnings:

  - You are about to drop the column `lastStatus` on the `monitors` table. All the data in the column will be lost.
  - You are about to drop the column `next_check_at` on the `monitors` table. All the data in the column will be lost.
  - You are about to drop the column `regions` on the `monitors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "monitors" DROP COLUMN "lastStatus",
DROP COLUMN "next_check_at",
DROP COLUMN "regions",
ADD COLUMN     "last_status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN';

-- CreateTable
CREATE TABLE "monitor_regions" (
    "monitor_id" UUID NOT NULL,
    "region" VARCHAR(50) NOT NULL,
    "last_checked_at" TIMESTAMP(3),
    "next_check_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "monitor_regions_pkey" PRIMARY KEY ("monitor_id","region")
);

-- CreateTable
CREATE TABLE "worker_statuses" (
    "region" VARCHAR(50) NOT NULL,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" VARCHAR(10) NOT NULL,
    "node_version" VARCHAR(20),

    CONSTRAINT "worker_statuses_pkey" PRIMARY KEY ("region")
);

-- AddForeignKey
ALTER TABLE "monitor_logs" ADD CONSTRAINT "monitor_logs_monitor_id_region_fkey" FOREIGN KEY ("monitor_id", "region") REFERENCES "monitor_regions"("monitor_id", "region") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_regions" ADD CONSTRAINT "monitor_regions_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_stats" ADD CONSTRAINT "monitor_stats_monitor_id_region_fkey" FOREIGN KEY ("monitor_id", "region") REFERENCES "monitor_regions"("monitor_id", "region") ON DELETE CASCADE ON UPDATE CASCADE;
