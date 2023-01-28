ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS occupation_sub character varying(200);
ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS occupation_minor character varying(200);
ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS education_main character varying(200);
ALTER TABLE eg_death_statistical_registry ADD COLUMN IF NOT EXISTS  education_sub character varying(200);

ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS occupation_sub character varying(200);
ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS occupation_minor character varying(200);
ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS education_main character varying(200);
ALTER TABLE eg_death_statistical_registry_log ADD COLUMN IF NOT EXISTS  education_sub character varying(200);

ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS occupation_sub character varying(200);
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS occupation_minor character varying(200);
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS education_main character varying(200);
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS  education_sub character varying(200);

ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS occupation_sub character varying(200);
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS occupation_minor character varying(200);
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS education_main character varying(200);
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS  education_sub character varying(200);