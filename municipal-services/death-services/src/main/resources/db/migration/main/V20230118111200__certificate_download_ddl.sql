
ALTER TABLE eg_death_cert_request ADD COLUMN IF NOT EXISTS  counter integer;
ALTER TABLE eg_death_cert_request_audit	ADD COLUMN IF NOT EXISTS  counter integer;