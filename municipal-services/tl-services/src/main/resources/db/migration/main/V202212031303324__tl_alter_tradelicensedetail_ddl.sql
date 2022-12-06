ALTER TABLE eg_tl_tradelicensedetail
ADD COLUMN licenceunittype character varying(64),
ADD COLUMN licenceunitid character varying(64),
ADD COLUMN structureplacesubtype character varying(64),
ADD COLUMN customdetailtype character varying(300),
ADD COLUMN businessactivitydesc character varying(1024),
ADD COLUMN licenseetype character varying(64);