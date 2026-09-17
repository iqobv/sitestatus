-- CreateEnum
CREATE TYPE "SiteStatus" AS ENUM ('UNKNOWN', 'UP', 'DOWN');

-- CreateEnum
CREATE TYPE "StatPeriod" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "monitor_incidents" (
    "id" TEXT NOT NULL,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "trigger_log_id" TEXT,
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

-- CreateTable
CREATE TABLE "monitor_logs" (
    "id" TEXT NOT NULL,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "status_code" INTEGER,
    "response_time_ms" INTEGER NOT NULL,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitor_logs_pkey" PRIMARY KEY ("id","created_at")
);

-- CreateTable
CREATE TABLE "monitor_regions" (
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "last_checked_at" TIMESTAMP(3),
    "last_status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "is_queued" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_regions_pkey" PRIMARY KEY ("monitor_id","region_id")
);

-- CreateTable
CREATE TABLE "monitor_states" (
    "id" TEXT NOT NULL,
    "monitor_id" TEXT NOT NULL,
    "next_check_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_checked_at" TIMESTAMP(3),
    "last_status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitor_stats" (
    "id" TEXT NOT NULL,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "status" "SiteStatus" NOT NULL DEFAULT 'UNKNOWN',
    "avg_response_ms" INTEGER NOT NULL,
    "uptime_percent" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "total_checks" INTEGER NOT NULL DEFAULT 0,
    "successfull_checks" INTEGER NOT NULL DEFAULT 0,
    "period" "StatPeriod" NOT NULL,

    CONSTRAINT "monitor_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker_statuses" (
    "region_id" TEXT NOT NULL,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT NOT NULL,
    "node_version" TEXT,

    CONSTRAINT "worker_statuses_pkey" PRIMARY KEY ("region_id")
);

-- CreateIndex
CREATE INDEX "monitor_incidents_monitor_id_idx" ON "monitor_incidents"("monitor_id");

-- CreateIndex
CREATE INDEX "monitor_logs_monitor_id_created_at_idx" ON "monitor_logs"("monitor_id", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "monitor_states_monitor_id_key" ON "monitor_states"("monitor_id");

-- CreateIndex
CREATE INDEX "monitor_stats_monitor_id_timestamp_idx" ON "monitor_stats"("monitor_id", "timestamp");

-- AddForeignKey
ALTER TABLE "monitor_incidents" ADD CONSTRAINT "monitor_incidents_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions"("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_stats" ADD CONSTRAINT "monitor_stats_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions"("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

SELECT create_hypertable('"monitor_logs"', by_range('created_at'));

SELECT add_retention_policy('"monitor_logs"', INTERVAL '30 days');
