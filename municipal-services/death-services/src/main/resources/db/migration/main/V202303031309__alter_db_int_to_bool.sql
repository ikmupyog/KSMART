ALTER TABLE eg_death_dtls ALTER COLUMN death_date_unavailable TYPE INT USING death_date_unavailable::integer;
ALTER TABLE eg_death_dtls ALTER COLUMN death_date_unavailable  TYPE bool  USING death_date_unavailable::boolean;

ALTER TABLE eg_death_dtls_log ALTER COLUMN death_date_unavailable TYPE INT USING death_date_unavailable::integer;
ALTER TABLE eg_death_dtls_log ALTER COLUMN death_date_unavailable  TYPE bool  USING death_date_unavailable::boolean;

ALTER TABLE eg_death_dtls_registry ALTER COLUMN death_date_unavailable TYPE INT USING death_date_unavailable::integer;
ALTER TABLE eg_death_dtls_registry ALTER COLUMN death_date_unavailable  TYPE bool  USING death_date_unavailable::boolean;

ALTER TABLE eg_death_dtls_registry_log ALTER COLUMN death_date_unavailable TYPE INT USING death_date_unavailable::integer;
ALTER TABLE eg_death_dtls_registry_log ALTER COLUMN death_date_unavailable  TYPE bool  USING death_date_unavailable::boolean;