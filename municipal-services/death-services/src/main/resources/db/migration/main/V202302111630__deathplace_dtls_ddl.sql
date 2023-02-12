ALTER TABLE eg_death_dtls 
ALTER COLUMN informant_aadhar_submitted TYPE INT USING informant_aadhar_submitted::integer;

ALTER TABLE eg_death_dtls ALTER COLUMN informant_aadhar_submitted  TYPE bool  USING informant_aadhar_submitted::boolean;

ALTER TABLE eg_death_dtls_log
ALTER COLUMN informant_aadhar_submitted TYPE INT USING informant_aadhar_submitted::integer;

ALTER TABLE eg_death_dtls_log ALTER COLUMN informant_aadhar_submitted  TYPE bool  USING informant_aadhar_submitted::boolean;

ALTER TABLE eg_death_dtls_registry
ALTER COLUMN informant_aadhar_submitted TYPE INT USING informant_aadhar_submitted::integer;

ALTER TABLE eg_death_dtls_registry ALTER COLUMN informant_aadhar_submitted  TYPE bool  USING informant_aadhar_submitted::boolean;

ALTER TABLE eg_death_dtls_registry_log 
ALTER COLUMN informant_aadhar_submitted TYPE INT USING informant_aadhar_submitted::integer;

ALTER TABLE eg_death_dtls_registry_log ALTER COLUMN informant_aadhar_submitted  TYPE bool  USING informant_aadhar_submitted::boolean;