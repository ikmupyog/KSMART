ALTER TABLE eg_tl_tradelicense_audit
ADD COLUMN IF NOT EXISTS is_migrated boolean,
ADD COLUMN IF NOT EXISTS licenseunitnamemal character varying(400);

ALTER TABLE eg_tl_tradelicensedetail_audit
ADD COLUMN IF NOT EXISTS licenseunittype character varying(64),
ADD COLUMN IF NOT EXISTS licenseunitid character varying(64),
ADD COLUMN IF NOT EXISTS structureplacesubtype character varying(64),
ADD COLUMN IF NOT EXISTS customdetailtype character varying(300),
ADD COLUMN IF NOT EXISTS businessactivitydesc character varying(1024),
ADD COLUMN IF NOT EXISTS licenseetype character varying(64),
ADD COLUMN IF NOT EXISTS institutionid character varying(64);