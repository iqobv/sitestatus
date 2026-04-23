/*
  Warnings:

  - The primary key for the `monitor_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitor_incidents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "trigger_log_id" TEXT,
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
INSERT INTO "new_monitor_incidents" ("alert_sent_at", "alert_triggered", "created_at", "error_message", "id", "monitor_id", "region_id", "resolved", "resolved_at", "status_code", "trigger_log_id", "updated_at") SELECT "alert_sent_at", "alert_triggered", "created_at", "error_message", "id", "monitor_id", "region_id", "resolved", "resolved_at", "status_code", "trigger_log_id", "updated_at" FROM "monitor_incidents";
DROP TABLE "monitor_incidents";
ALTER TABLE "new_monitor_incidents" RENAME TO "monitor_incidents";
CREATE INDEX "monitor_incidents_monitor_id_idx" ON "monitor_incidents"("monitor_id");
CREATE TABLE "new_monitor_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "status_code" INTEGER,
    "response_time_ms" INTEGER NOT NULL,
    "error_message" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "monitor_logs_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions" ("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_monitor_logs" ("created_at", "error_message", "id", "monitor_id", "region_id", "response_time_ms", "status", "status_code") SELECT "created_at", "error_message", "id", "monitor_id", "region_id", "response_time_ms", "status", "status_code" FROM "monitor_logs";
DROP TABLE "monitor_logs";
ALTER TABLE "new_monitor_logs" RENAME TO "monitor_logs";
CREATE INDEX "monitor_logs_monitor_id_created_at_idx" ON "monitor_logs"("monitor_id", "created_at");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
