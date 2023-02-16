ALTER TABLE eg_tl_tradelicense
	DROP COLUMN IF EXISTS renewalactive;
	
ALTER TABLE eg_tl_tradelicense
	ADD COLUMN IF NOT EXISTS renewalactive BOOLEAN NOT NULL DEFAULT TRUE;
