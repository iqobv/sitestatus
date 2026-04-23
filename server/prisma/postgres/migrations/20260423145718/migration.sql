/*
  Warnings:

  - You are about to drop the `monitor_regions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "monitor_regions" DROP CONSTRAINT "monitor_regions_monitor_id_fkey";

-- DropForeignKey
ALTER TABLE "monitor_regions" DROP CONSTRAINT "monitor_regions_region_id_fkey";

-- DropTable
DROP TABLE "monitor_regions";

-- CreateTable
CREATE TABLE "monitor_region_configs" (
    "monitor_id" UUID NOT NULL,
    "region_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_region_configs_pkey" PRIMARY KEY ("monitor_id","region_id")
);

-- AddForeignKey
ALTER TABLE "monitor_region_configs" ADD CONSTRAINT "monitor_region_configs_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_region_configs" ADD CONSTRAINT "monitor_region_configs_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
