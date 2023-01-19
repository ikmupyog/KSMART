ALTER TABLE eg_tl_tradelicense_audit 
DROP COLUMN businesssector, DROP COLUMN capitalinvestment, DROP COLUMN enterprisetype,
DROP COLUMN licenseunittype, DROP COLUMN licenseunitid,
DROP COLUMN structureplacesubtype, DROP COLUMN customdetailtype,
DROP COLUMN businessactivitydesc, DROP COLUMN licenseetype, 
DROP COLUMN mig_num_appln_id, DROP COLUMN institutionid;

ALTER TABLE eg_tl_tradelicensedetail_audit
ADD COLUMN IF NOT EXISTS businesssector character varying(64),
ADD COLUMN IF NOT EXISTS capitalinvestment numeric(14,2),
ADD COLUMN IF NOT EXISTS enterprisetype character varying(64),
ADD COLUMN IF NOT EXISTS licenseunittype character varying(64),
ADD COLUMN IF NOT EXISTS licenseunitid character varying(64),
ADD COLUMN IF NOT EXISTS structureplacesubtype character varying(64),
ADD COLUMN IF NOT EXISTS customdetailtype character varying(300),
ADD COLUMN IF NOT EXISTS businessactivitydesc character varying(1024),
ADD COLUMN IF NOT EXISTS licenseetype character varying(64),
ADD COLUMN IF NOT EXISTS mig_num_appln_id character varying(64),
ADD COLUMN IF NOT EXISTS institutionid character varying(64);