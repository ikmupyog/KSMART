ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS kiosk_id bigint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS kiosk_id bigint;

ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS kiosk_id bigint;
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS kiosk_id bigint;