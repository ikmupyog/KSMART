DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns
    WHERE table_name='eg_death_dtls' and column_name='correct_death_date_known')
  THEN
      ALTER TABLE "public"."eg_death_dtls" RENAME COLUMN "correct_death_date_known" TO "death_date_unavailable";
	  ALTER TABLE "public"."eg_death_dtls_log" RENAME COLUMN "correct_death_date_known" TO "death_date_unavailable";
	  ALTER TABLE "public"."eg_death_dtls_registry" RENAME COLUMN "correct_death_date_known" TO "death_date_unavailable";
	  ALTER TABLE "public"."eg_death_dtls_registry_log" RENAME COLUMN "correct_death_date_known" TO "death_date_unavailable";  
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns
    WHERE table_name='eg_death_dtls' and column_name='deceased_identified')
  THEN
      ALTER TABLE "public"."eg_death_dtls" RENAME COLUMN "deceased_identified" TO "deceased_unidentified";
	  ALTER TABLE "public"."eg_death_dtls_log" RENAME COLUMN "deceased_identified" TO "deceased_unidentified";
	  ALTER TABLE "public"."eg_death_dtls_registry" RENAME COLUMN "deceased_identified" TO "deceased_unidentified";
	  ALTER TABLE "public"."eg_death_dtls_registry_log" RENAME COLUMN "deceased_identified" TO "deceased_unidentified";
	  
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns
    WHERE table_name='eg_death_dtls' and column_name='death_place_office_name')
  THEN
      ALTER TABLE "public"."eg_death_dtls" RENAME COLUMN "death_place_office_name" TO "death_place_officer_name";
	  ALTER TABLE "public"."eg_death_dtls_log" RENAME COLUMN "death_place_office_name" TO "death_place_officer_name";
	  ALTER TABLE "public"."eg_death_dtls_registry" RENAME COLUMN "death_place_office_name" TO "death_place_officer_name";
	  ALTER TABLE "public"."eg_death_dtls_registry_log" RENAME COLUMN "death_place_office_name" TO "death_place_officer_name";	  
  END IF;
END $$;

ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS bad_record smallint;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS record_no character varying(20);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS F12_no character varying(20);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS F12_issued smallint;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS book_no character varying(20);
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS is_migrated smallint;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS migration_date bigint;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS kiosk_id bigint;

ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS bad_record smallint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS record_no character varying(20);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS F12_no character varying(20);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS F12_issued smallint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS book_no character varying(20);
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS is_migrated smallint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS migration_date bigint;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS kiosk_id bigint;

ALTER TABLE eg_death_applicant_dtls ADD COLUMN IF NOT EXISTS applicant_email character varying(64);