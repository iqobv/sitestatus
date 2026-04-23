-- CreateTable
CREATE TABLE "monitor_regions" (
    "monitor_id" UUID NOT NULL,
    "region_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_regions_pkey" PRIMARY KEY ("monitor_id","region_id")
);

-- AddForeignKey
ALTER TABLE "monitor_regions" ADD CONSTRAINT "monitor_regions_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_regions" ADD CONSTRAINT "monitor_regions_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
