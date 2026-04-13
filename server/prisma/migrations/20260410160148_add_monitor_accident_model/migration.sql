-- CreateTable
CREATE TABLE "monitor_accidents" (
    "id" UUID NOT NULL,
    "monitor_id" UUID NOT NULL,
    "region_id" UUID NOT NULL,
    "trigger_log_id" BIGINT NOT NULL,
    "error_message" TEXT NOT NULL,
    "status_code" INTEGER NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolved_at" TIMESTAMP(3),
    "alerts_triggered" BOOLEAN NOT NULL DEFAULT false,
    "alert_sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitor_accidents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "monitor_accidents_monitor_id_idx" ON "monitor_accidents"("monitor_id");

-- AddForeignKey
ALTER TABLE "monitor_accidents" ADD CONSTRAINT "monitor_accidents_trigger_log_id_fkey" FOREIGN KEY ("trigger_log_id") REFERENCES "monitor_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitor_accidents" ADD CONSTRAINT "monitor_accidents_monitor_id_region_id_fkey" FOREIGN KEY ("monitor_id", "region_id") REFERENCES "monitor_regions"("monitor_id", "region_id") ON DELETE CASCADE ON UPDATE CASCADE;
