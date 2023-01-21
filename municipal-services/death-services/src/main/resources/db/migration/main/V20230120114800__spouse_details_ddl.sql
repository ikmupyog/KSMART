ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS spouse_name_en character varying(64);
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS spouse_name_ml character varying(64);
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS spouse_unavailable smallint;
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS spouse_type character varying(64);

ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS spouse_name_en character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS spouse_name_ml character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS spouse_unavailable smallint;
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS spouse_type character varying(64);

ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS spouse_name_en character varying(64);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS spouse_name_ml character varying(64);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS spouse_unavailable smallint;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS spouse_type character varying(64);

ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS spouse_name_en character varying(64);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS spouse_name_ml character varying(64);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS spouse_unavailable smallint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS spouse_type character varying(64);

ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS smoking_type integer;
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS tobacco_type integer;
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS arecanut_type integer;
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS alcohol_type integer;

ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS smoking_type integer;
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS tobacco_type integer;
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS arecanut_type integer;
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS alcohol_type integer;

ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS smoking_type integer;
ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS tobacco_type integer;
ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS arecanut_type integer;
ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS alcohol_type integer;

ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS smoking_type integer;
ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS tobacco_type integer;
ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS arecanut_type integer;
ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS alcohol_type integer;

ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS spouse_emailid character varying(64);
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS spouse_aadhaar character varying(64);
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS spouse_mobileno character varying(64);

ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS spouse_emailid character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS spouse_aadhaar character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS spouse_mobileno character varying(64);

ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS spouse_emailid character varying(64);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS spouse_aadhaar character varying(64);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS spouse_mobileno character varying(64);

ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS spouse_emailid character varying(64);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS spouse_aadhaar character varying(64);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS spouse_mobileno character varying(64);

ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS funcion_UID character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS funcion_UID character varying(64);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS funcion_UID character varying(64);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS funcion_UID character varying(64);


