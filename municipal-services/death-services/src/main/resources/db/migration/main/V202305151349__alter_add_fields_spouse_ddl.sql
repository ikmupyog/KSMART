ALTER TABLE eg_death_dtls add column IF NOT EXISTS spouse_if_alive character varying(64);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS spouse_age Integer;

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS spouse_if_alive character varying(64);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS spouse_age Integer;

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS spouse_if_alive character varying(64);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS spouse_age Integer;

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS spouse_if_alive character varying(64);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS spouse_age Integer;