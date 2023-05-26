ALTER TABLE  eg_death_dtls_registry ADD COLUMN IF NOT EXISTS migrated_from character varying(64);
ALTER TABLE  eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS migrated_from character varying(64);