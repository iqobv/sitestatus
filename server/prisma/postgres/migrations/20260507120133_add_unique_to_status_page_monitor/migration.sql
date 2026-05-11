/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `status_pages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[status_page_id,monitor_id]` on the table `status_page_monitors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `status_page_monitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "status_page_monitors" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "status_pages" DROP COLUMN "deleted_at";

-- CreateIndex
CREATE UNIQUE INDEX "status_page_monitors_status_page_id_monitor_id_key" ON "status_page_monitors"("status_page_id", "monitor_id");
