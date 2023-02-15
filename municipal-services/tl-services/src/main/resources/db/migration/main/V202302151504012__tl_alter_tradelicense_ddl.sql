ALTER TABLE eg_tl_tradelicense
	ADD COLUMN IF NOT EXISTS renewalactive BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE eg_tl_address 
	ALTER COLUMN buildingname type character varying(150);