ALTER TABLE public.eg_marriage_bride_groom_details
  DROP COLUMN no_of_spouse_living,
  ADD COLUMN IF NOT EXISTS no_of_spouse_living bigint;

ALTER TABLE public.eg_register_marriage_details
  ADD COLUMN IF NOT EXISTS migrated_marriage_type character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details_audit
  ADD COLUMN IF NOT EXISTS migrated_marriage_type character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_permanent_address_details
    ADD COLUMN IF NOT EXISTS poname_ml character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_permanent_address_details_audit
    ADD COLUMN IF NOT EXISTS poname_ml character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_present_address_details
    ADD COLUMN IF NOT EXISTS poname_ml character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_present_address_details_audit
    ADD COLUMN IF NOT EXISTS poname_ml character varying(64) COLLATE pg_catalog."default";
--
--ALTER TABLE eg_marriage_bride_groom_details RENAME COLUMN firstname_mal TO firstname_ml;
--ALTER TABLE eg_marriage_bride_groom_details RENAME COLUMN middlename_mal TO middlename_ml;
--ALTER TABLE eg_marriage_bride_groom_details RENAME COLUMN mothername_mal TO mothername_ml;
--ALTER TABLE eg_marriage_bride_groom_details RENAME COLUMN guardianname_mal TO guardianname_ml;
--ALTER TABLE eg_marriage_bride_groom_details RENAME COLUMN lastname_mal TO lastname_ml;
--ALTER TABLE eg_marriage_bride_groom_details RENAME COLUMN fathername_mal TO fathername_ml;
--
--
--ALTER TABLE eg_marriage_bride_groom_details_audit RENAME COLUMN  firstname_mal TO firstname_ml;
--ALTER TABLE eg_marriage_bride_groom_details_audit RENAME COLUMN  middlename_mal TO middlename_ml;
--ALTER TABLE eg_marriage_bride_groom_details_audit RENAME COLUMN  mothername_mal TO mothername_ml;
--ALTER TABLE eg_marriage_bride_groom_details_audit RENAME COLUMN  guardianname_mal TO guardianname_ml;
--ALTER TABLE eg_marriage_bride_groom_details_audit RENAME COLUMN  lastname_mal TO lastname_ml;
--ALTER TABLE eg_marriage_bride_groom_details_audit RENAME COLUMN  fathername_mal TO fathername_ml;
