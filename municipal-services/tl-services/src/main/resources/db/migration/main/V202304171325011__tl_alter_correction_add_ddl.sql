ALTER TABLE eg_tl_correction
	ADD COLUMN IF NOT EXISTS applicationType character varying(64),
	ADD COLUMN IF NOT EXISTS workflowCode character varying(64),
	ADD COLUMN IF NOT EXISTS action character varying(64);