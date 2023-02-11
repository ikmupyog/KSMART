ALTER TABLE eg_death_dtls add column IF NOT EXISTS family_mobile_no BIGINT;
ALTER TABLE eg_death_dtls add column IF NOT EXISTS family_email character varying(200);

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS family_mobile_no BIGINT;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS family_email character varying(200);

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS family_mobile_no BIGINT;
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS family_email character varying(200);

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS family_mobile_no BIGINT;
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS family_email character varying(200);