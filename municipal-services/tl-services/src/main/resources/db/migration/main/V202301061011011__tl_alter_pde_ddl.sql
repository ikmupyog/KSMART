ALTER TABLE eg_tl_address
ADD COLUMN lbbuildingcode character varying(20),
ADD COLUMN lbbuildingname character varying(150),
ADD COLUMN buildingtype character varying(15);

ALTER TABLE eg_tl_tradelicensedetail
ADD COLUMN institutionid character varying(64);

ALTER TABLE eg_tl_owner_pde
ADD COLUMN lastmodifiedby character varying(64),
ADD COLUMN lastmodifiedtime bigint;

ALTER TABLE eg_tl_structureplacedetail
ADD COLUMN stallno character varying(150);