/*
  Warnings:

  - You are about to drop the column `is_public` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `projects` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "projects_slug_key";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "is_public",
DROP COLUMN "slug";

-- CreateTable
CREATE TABLE "status_page_monitors" (
    "id" UUID NOT NULL,
    "status_page_id" UUID NOT NULL,
    "monitor_id" UUID NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "display_name" TEXT,

    CONSTRAINT "status_page_monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_pages" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "custom_domain" TEXT,
    "icon_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "status_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_pages_slug_key" ON "status_pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "status_pages_custom_domain_key" ON "status_pages"("custom_domain");

-- AddForeignKey
ALTER TABLE "status_page_monitors" ADD CONSTRAINT "status_page_monitors_status_page_id_fkey" FOREIGN KEY ("status_page_id") REFERENCES "status_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_page_monitors" ADD CONSTRAINT "status_page_monitors_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_pages" ADD CONSTRAINT "status_pages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
