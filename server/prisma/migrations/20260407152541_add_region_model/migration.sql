/*
  Warnings:

  - You are about to drop the column `region` on the `monitor_logs` table. All the data in the column will be lost.
  - The primary key for the `monitor_regions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `region` on the `monitor_regions` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `monitor_stats` table. All the data in the column will be lost.
  - The primary key for the `worker_statuses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `region` on the `worker_statuses` table. All the data in the column will be lost.
  - Added the required column `region_id` to the `monitor_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `monitor_regions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `monitor_stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `worker_statuses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "monitor_logs" DROP CONSTRAINT "monitor_logs_monitor_id_region_fkey";

-- DropForeignKey
ALTER TABLE "monitor_stats" DROP CONSTRAINT "monitor_stats_monitor_id_region_fkey";

-- AlterTable
ALTER TABLE "monitor_logs" DROP COLUMN "region",
ADD COLUMN     "region_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "monitor_regions" DROP CONSTRAINT "monitor_regions_pkey",
DROP COLUMN "region",
ADD COLUMN     "region_id" UUID NOT NULL,
ADD CONSTRAINT "monitor_regions_pkey" PRIMARY KEY ("monitor_id", "region_id");

-- AlterTable
ALTER TABLE "monitor_stats" DROP COLUMN "region",
ADD COLUMN     "region_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "worker_statuses" DROP CONSTRAINT "worker_statuses_pkey",
DROP COLUMN "region",
ADD COLUMN     "region_id" UUID NOT NULL,
ADD CONSTRAINT "worker_statuses_pkey" PRIMARY KEY ("region_id");

-- CreateTable
CREATE TABLE "regions" (
    "id" UUID NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "continent" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_key_key" ON "regions"("key");

-- CreateIndex
CREATE INDEX "regions_key_idx" ON "regions"("key");

-- AddForeignKey
ALTER TABLE "monitor_logs" ADD CONSTRAINT "monitor_logs_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_logs" ADD CONSTRAINT "monitor_logs_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions"("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_regions" ADD CONSTRAINT "monitor_regions_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_stats" ADD CONSTRAINT "monitor_stats_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_stats" ADD CONSTRAINT "monitor_stats_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions"("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_statuses" ADD CONSTRAINT "worker_statuses_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
