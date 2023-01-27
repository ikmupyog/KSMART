
ALTER TABLE eg_death_dtls_registry DROP IF EXISTS dataporting_flag ;
ALTER TABLE eg_death_dtls_registry DROP IF EXISTS dataporting_date  ;

ALTER TABLE eg_death_dtls_registry_log DROP IF EXISTS dataporting_flag ;
ALTER TABLE eg_death_dtls_registry_log DROP IF EXISTS dataporting_date  ;


ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS is_migrated smallint;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS migration_date bigint;

ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS is_migrated smallint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS migration_date bigint;

ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS burial_state character varying(64);
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS vehicle_first_halt character varying(200);
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS male_dependent_unavailable smallint;
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS female_dependent_unavailable smallint;

ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS burial_state character varying(64);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS vehicle_first_halt character varying(200);
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS male_dependent_unavailable smallint;
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS female_dependent_unavailable smallint;

ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS burial_state character varying(64);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS vehicle_first_halt character varying(200);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS male_dependent_unavailable smallint;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS female_dependent_unavailable smallint;

ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS burial_state character varying(64);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS vehicle_first_halt character varying(200);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS male_dependent_unavailable smallint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS female_dependent_unavailable smallint;


ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS occupation_sub character varying(200);
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS occupation_minor character varying(200);
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS education_main character varying(200);
ALTER TABLE eg_death_statistical_dtls ADD COLUMN IF NOT EXISTS  education_sub character varying(200);

ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS occupation_sub character varying(200);
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS occupation_minor character varying(200);
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS education_main character varying(200);
ALTER TABLE eg_death_statistical_dtls_log ADD COLUMN IF NOT EXISTS  education_sub character varying(200);

ALTER TABLE eg_death_applicant_dtls ADD COLUMN IF NOT EXISTS applicant_relation  character varying(64);

-- DO $$
-- BEGIN
--   IF EXISTS(SELECT * FROM information_schema.columns
--     WHERE table_name='eg_death_dtls' and column_name='place_burial')
--   THEN
    --   ALTER TABLE "public"."eg_death_dtls" RENAME COLUMN "place_burial" TO "burial_district";
	--   ALTER TABLE "public"."eg_death_dtls" RENAME COLUMN "place_burial_institution_type" TO "burial_lbtype";
	--   ALTER TABLE "public"."eg_death_dtls" RENAME COLUMN "place_burial_institution_name" TO "burial_lbname";
 	 
	--   ALTER TABLE "public"."eg_death_dtls_log" RENAME COLUMN "place_burial" TO "burial_district";
	--   ALTER TABLE "public"."eg_death_dtls_log" RENAME COLUMN "place_burial_institution_type" TO "burial_lbtype";
	--   ALTER TABLE "public"."eg_death_dtls_log" RENAME COLUMN "place_burial_institution_name" TO "burial_lbname";
	  
	--   ALTER TABLE "public"."eg_death_dtls_registry" RENAME COLUMN "place_burial" TO "burial_district";
	--   ALTER TABLE "public"."eg_death_dtls_registry" RENAME COLUMN "place_burial_institution_type" TO "burial_lbtype";
	--   ALTER TABLE "public"."eg_death_dtls_registry" RENAME COLUMN "place_burial_institution_name" TO "burial_lbname";
 	 
	--   ALTER TABLE "public"."eg_death_dtls_registry_log" RENAME COLUMN "place_burial" TO "burial_district";
	--   ALTER TABLE "public"."eg_death_dtls_registry_log" RENAME COLUMN "place_burial_institution_type" TO "burial_lbtype";
	--   ALTER TABLE "public"."eg_death_dtls_registry_log" RENAME COLUMN "place_burial_institution_name" TO "burial_lbname";
	  
--   END IF;
-- END $$;






