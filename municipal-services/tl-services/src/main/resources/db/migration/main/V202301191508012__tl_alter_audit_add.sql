ALTER TABLE eg_tl_tradelicense_audit DROP COLUMN is_migrated, DROP COLUMN licenseunitnamemal;

ALTER TABLE eg_tl_tradelicense_audit
ADD COLUMN IF NOT EXISTS licenseunitnamemal character varying(400),
ADD COLUMN IF NOT EXISTS is_migrated boolean;