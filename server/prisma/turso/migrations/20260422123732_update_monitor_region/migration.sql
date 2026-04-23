/*
  Warnings:

  - You are about to drop the column `is_active` on the `monitor_regions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitor_regions" (
    "monitor_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "last_checked_at" DATETIME,
    "next_check_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "is_queued" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("monitor_id", "region_id")
);
INSERT INTO "new_monitor_regions" ("created_at", "is_queued", "last_checked_at", "last_status", "monitor_id", "next_check_at", "region_id", "updated_at") SELECT "created_at", "is_queued", "last_checked_at", "last_status", "monitor_id", "next_check_at", "region_id", "updated_at" FROM "monitor_regions";
DROP TABLE "monitor_regions";
ALTER TABLE "new_monitor_regions" RENAME TO "monitor_regions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
