
ALTER TABLE eg_death_dtls add column IF NOT EXISTS informant_address character varying(500);
ALTER TABLE eg_death_dtls add column IF NOT EXISTS initiator_address character varying(500);

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS informant_address character varying(500);
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS initiator_address character varying(500);

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS informant_address character varying(500);
ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS initiator_address character varying(500);

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS informant_address character varying(500);
ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS initiator_address character varying(500);