-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitor_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "status_code" INTEGER,
    "response_time_ms" INTEGER NOT NULL,
    "error_message" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_monitor_logs" ("created_at", "error_message", "id", "monitor_id", "region_id", "response_time_ms", "status", "status_code") SELECT "created_at", "error_message", "id", "monitor_id", "region_id", "response_time_ms", "status", "status_code" FROM "monitor_logs";
DROP TABLE "monitor_logs";
ALTER TABLE "new_monitor_logs" RENAME TO "monitor_logs";
CREATE INDEX "monitor_logs_monitor_id_created_at_idx" ON "monitor_logs"("monitor_id", "created_at");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
