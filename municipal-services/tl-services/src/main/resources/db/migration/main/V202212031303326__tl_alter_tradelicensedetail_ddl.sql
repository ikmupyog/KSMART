ALTER TABLE eg_tl_tradelicensedetail RENAME COLUMN licenceunittype TO licenseunittype;
ALTER TABLE eg_tl_tradelicensedetail RENAME COLUMN licenceunitid TO licenseunitid;

ALTER TABLE eg_tl_structureplacedetail DROP COLUMN structureplacesubtype;