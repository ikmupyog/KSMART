
ALTER TABLE eg_death_dtls add column IF NOT EXISTS is_declaration_initiator BOOLEAN;

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS is_declaration_initiator BOOLEAN;

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS is_declaration_initiator BOOLEAN;

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS is_declaration_initiator BOOLEAN;

ALTER TABLE eg_death_dtls add column IF NOT EXISTS is_declaration_informant BOOLEAN;

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS is_declaration_informant BOOLEAN;

ALTER TABLE eg_death_dtls_registry add column IF NOT EXISTS is_declaration_informant BOOLEAN;

ALTER TABLE eg_death_dtls_registry_log add column IF NOT EXISTS is_declaration_informant BOOLEAN;