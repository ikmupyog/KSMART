ALTER TABLE eg_death_dtls_log RENAME COLUMN correct_death_date_known TO death_date_unavailable;

ALTER TABLE eg_death_dtls_log ALTER COLUMN death_date_unavailable TYPE INT USING death_date_unavailable::integer;
ALTER TABLE eg_death_dtls_log ALTER COLUMN death_date_unavailable  TYPE bool  USING death_date_unavailable::boolean;