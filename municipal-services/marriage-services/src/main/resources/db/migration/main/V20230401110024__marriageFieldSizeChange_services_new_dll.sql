ALTER TABLE eg_marriage_bride_groom_details
ALTER COLUMN mobile TYPE bigint
USING mobile::bigint;

ALTER TABLE eg_marriage_bride_groom_details_audit
ALTER COLUMN mobile TYPE bigint
USING mobile::bigint;

ALTER TABLE eg_register_marriage_bride_groom_details
ALTER COLUMN mobile TYPE bigint
USING mobile::bigint;

ALTER TABLE eg_register_marriage_bride_groom_details_audit
ALTER COLUMN mobile TYPE bigint
USING mobile::bigint;