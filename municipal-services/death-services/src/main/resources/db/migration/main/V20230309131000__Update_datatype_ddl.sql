ALTER TABLE eg_death_dtls ALTER COLUMN informant_mobile_no TYPE BIGINT USING informant_mobile_no::BIGINT;
ALTER TABLE eg_death_dtls_log ALTER COLUMN informant_mobile_no TYPE BIGINT USING informant_mobile_no::BIGINT;
ALTER TABLE eg_death_dtls_registry ALTER COLUMN informant_mobile_no TYPE BIGINT USING informant_mobile_no::BIGINT;
ALTER TABLE eg_death_dtls_registry_log ALTER COLUMN informant_mobile_no TYPE BIGINT USING informant_mobile_no::BIGINT;