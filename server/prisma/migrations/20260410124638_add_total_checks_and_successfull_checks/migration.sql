-- AlterTable
ALTER TABLE "monitor_regions" ADD COLUMN     "is_queued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "monitor_stats" ADD COLUMN     "successfull_checks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_checks" INTEGER NOT NULL DEFAULT 0;
