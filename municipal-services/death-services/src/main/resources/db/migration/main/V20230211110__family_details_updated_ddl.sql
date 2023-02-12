ALTER TABLE eg_death_dtls 
ALTER COLUMN spouse_unavailable TYPE INT USING spouse_unavailable::integer;
ALTER TABLE eg_death_dtls 
ALTER COLUMN male_dependent_unavailable TYPE INT USING male_dependent_unavailable::integer;
ALTER TABLE eg_death_dtls 
ALTER COLUMN female_dependent_unavailable TYPE INT USING female_dependent_unavailable::integer;


ALTER TABLE eg_death_dtls ALTER COLUMN spouse_unavailable  TYPE bool  USING spouse_unavailable::boolean;
ALTER TABLE eg_death_dtls ALTER COLUMN male_dependent_unavailable  TYPE bool  USING male_dependent_unavailable::boolean;
ALTER TABLE eg_death_dtls ALTER COLUMN female_dependent_unavailable  TYPE bool  USING female_dependent_unavailable::boolean;

ALTER TABLE eg_death_dtls_log 
ALTER COLUMN spouse_unavailable TYPE INT USING spouse_unavailable::integer;
ALTER TABLE eg_death_dtls_log 
ALTER COLUMN male_dependent_unavailable TYPE INT USING male_dependent_unavailable::integer;
ALTER TABLE eg_death_dtls_log 
ALTER COLUMN female_dependent_unavailable TYPE INT USING female_dependent_unavailable::integer;


ALTER TABLE eg_death_dtls_log ALTER COLUMN spouse_unavailable  TYPE bool  USING spouse_unavailable::boolean;
ALTER TABLE eg_death_dtls_log ALTER COLUMN male_dependent_unavailable  TYPE bool  USING male_dependent_unavailable::boolean;
ALTER TABLE eg_death_dtls_log ALTER COLUMN female_dependent_unavailable  TYPE bool  USING female_dependent_unavailable::boolean;

ALTER TABLE eg_death_dtls_registry 
ALTER COLUMN spouse_unavailable TYPE INT USING spouse_unavailable::integer;
ALTER TABLE eg_death_dtls_registry 
ALTER COLUMN male_dependent_unavailable TYPE INT USING male_dependent_unavailable::integer;
ALTER TABLE eg_death_dtls_registry 
ALTER COLUMN female_dependent_unavailable TYPE INT USING female_dependent_unavailable::integer;


ALTER TABLE eg_death_dtls_registry ALTER COLUMN spouse_unavailable  TYPE bool  USING spouse_unavailable::boolean;
ALTER TABLE eg_death_dtls_registry ALTER COLUMN male_dependent_unavailable  TYPE bool  USING male_dependent_unavailable::boolean;
ALTER TABLE eg_death_dtls_registry ALTER COLUMN female_dependent_unavailable  TYPE bool  USING female_dependent_unavailable::boolean;

ALTER TABLE eg_death_dtls_registry_log 
ALTER COLUMN spouse_unavailable TYPE INT USING spouse_unavailable::integer;
ALTER TABLE eg_death_dtls_registry_log 
ALTER COLUMN male_dependent_unavailable TYPE INT USING male_dependent_unavailable::integer;
ALTER TABLE eg_death_dtls_registry_log 
ALTER COLUMN female_dependent_unavailable TYPE INT USING female_dependent_unavailable::integer;


ALTER TABLE eg_death_dtls_registry_log ALTER COLUMN spouse_unavailable  TYPE bool  USING spouse_unavailable::boolean;
ALTER TABLE eg_death_dtls_registry_log ALTER COLUMN male_dependent_unavailable  TYPE bool  USING male_dependent_unavailable::boolean;
ALTER TABLE eg_death_dtls_registry_log ALTER COLUMN female_dependent_unavailable  TYPE bool  USING female_dependent_unavailable::boolean;

 
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS initiator_relation character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS initiator_relation character varying(64);
