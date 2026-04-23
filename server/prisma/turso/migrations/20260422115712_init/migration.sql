-- CreateTable
CREATE TABLE "monitor_incidents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "trigger_log_id" BIGINT,
    "error_message" TEXT,
    "status_code" INTEGER,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolved_at" DATETIME,
    "alert_triggered" BOOLEAN NOT NULL DEFAULT false,
    "alert_sent_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "monitor_incidents_trigger_log_id_fkey" FOREIGN KEY ("trigger_log_id") REFERENCES "monitor_logs" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "monitor_incidents_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions" ("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "monitor_logs" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "status_code" INTEGER,
    "response_time_ms" INTEGER NOT NULL,
    "error_message" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "monitor_logs_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions" ("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "monitor_regions" (
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "last_checked_at" DATETIME,
    "next_check_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_queued" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("monitor_id", "region_id")
);

-- CreateTable
CREATE TABLE "monitor_states" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "last_checked_at" DATETIME,
    "last_status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "monitor_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "avg_response_ms" INTEGER NOT NULL,
    "uptime_percent" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "total_checks" INTEGER NOT NULL DEFAULT 0,
    "successfull_checks" INTEGER NOT NULL DEFAULT 0,
    "period" TEXT NOT NULL,
    CONSTRAINT "monitor_stats_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions" ("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "worker_statuses" (
    "region_id" TEXT NOT NULL PRIMARY KEY,
    "last_seen_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT NOT NULL,
    "node_version" TEXT
);

-- CreateIndex
CREATE INDEX "monitor_incidents_monitor_id_idx" ON "monitor_incidents"("monitor_id");

-- CreateIndex
CREATE INDEX "monitor_logs_monitor_id_created_at_idx" ON "monitor_logs"("monitor_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "monitor_states_monitor_id_key" ON "monitor_states"("monitor_id");

-- CreateIndex
CREATE INDEX "monitor_stats_monitor_id_timestamp_idx" ON "monitor_stats"("monitor_id", "timestamp");
