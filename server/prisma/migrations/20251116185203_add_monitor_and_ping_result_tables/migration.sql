-- CreateEnum
CREATE TYPE "SiteStatus" AS ENUM ('UNKNOWN', 'UP', 'DOWN');

-- CreateTable
CREATE TABLE "monitors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "check_interval_seconds" INTEGER NOT NULL DEFAULT 300,
    "last_checked_at" TIMESTAMP(3),
    "lastStatus" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ping_results" (
    "id" TEXT NOT NULL,
    "monitor_id" TEXT NOT NULL,
    "status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "status_code" INTEGER,
    "response_time_ms" INTEGER,
    "error_message" TEXT,
    "checked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ping_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ping_results_monitor_id_checked_at_idx" ON "ping_results"("monitor_id", "checked_at");

-- AddForeignKey
ALTER TABLE "ping_results" ADD CONSTRAINT "ping_results_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
