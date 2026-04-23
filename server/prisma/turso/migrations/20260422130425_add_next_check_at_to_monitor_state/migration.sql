/*
  Warnings:

  - You are about to drop the column `next_check_at` on the `monitor_regions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitor_regions" (
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "last_checked_at" DATETIME,
    "last_status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "is_queued" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("monitor_id", "region_id")
);
INSERT INTO "new_monitor_regions" ("created_at", "is_queued", "last_checked_at", "last_status", "monitor_id", "region_id", "updated_at") SELECT "created_at", "is_queued", "last_checked_at", "last_status", "monitor_id", "region_id", "updated_at" FROM "monitor_regions";
DROP TABLE "monitor_regions";
ALTER TABLE "new_monitor_regions" RENAME TO "monitor_regions";
CREATE TABLE "new_monitor_states" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitor_id" TEXT NOT NULL,
    "next_check_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_checked_at" DATETIME,
    "last_status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_monitor_states" ("created_at", "id", "last_checked_at", "last_status", "monitor_id", "updated_at") SELECT "created_at", "id", "last_checked_at", "last_status", "monitor_id", "updated_at" FROM "monitor_states";
DROP TABLE "monitor_states";
ALTER TABLE "new_monitor_states" RENAME TO "monitor_states";
CREATE UNIQUE INDEX "monitor_states_monitor_id_key" ON "monitor_states"("monitor_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
