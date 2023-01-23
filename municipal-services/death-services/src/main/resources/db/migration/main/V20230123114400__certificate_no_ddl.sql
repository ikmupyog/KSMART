ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS certificate_no_id bigint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS certificate_no_id bigint;

ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS certificate_no character varying(64);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS certificate_no character varying(64);

ALTER TABLE eg_death_cert_request ADD COLUMN IF NOT EXISTS certificate_no character varying(64);
ALTER TABLE eg_death_cert_request_audit ADD COLUMN IF NOT EXISTS certificate_no character varying(64);

ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS certificate_date bigint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS certificate_date bigint;