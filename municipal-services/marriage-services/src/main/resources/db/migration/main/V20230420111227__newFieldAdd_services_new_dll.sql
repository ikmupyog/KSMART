ALTER TABLE public.eg_marriage_details
  ADD COLUMN IF NOT EXISTS module_code character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_details_audit
  ADD COLUMN IF NOT EXISTS module_code character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details
  ADD COLUMN IF NOT EXISTS module_code character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details_audit
  ADD COLUMN IF NOT EXISTS module_code character varying(64) COLLATE pg_catalog."default";

    ALTER TABLE public.eg_marriage_bride_groom_details ALTER COLUMN father_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_marriage_bride_groom_details ALTER COLUMN mother_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_marriage_bride_groom_details ALTER COLUMN guardian_aadharno TYPE VARCHAR(200);

    ALTER TABLE public.eg_marriage_bride_groom_details_audit ALTER COLUMN father_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_marriage_bride_groom_details_audit ALTER COLUMN mother_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_marriage_bride_groom_details_audit ALTER COLUMN guardian_aadharno TYPE VARCHAR(200);

    ALTER TABLE public.eg_register_marriage_bride_groom_details ALTER COLUMN father_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_register_marriage_bride_groom_details ALTER COLUMN mother_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_register_marriage_bride_groom_details ALTER COLUMN guardian_aadharno TYPE VARCHAR(200);

    ALTER TABLE public.eg_register_marriage_bride_groom_details_audit ALTER COLUMN father_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_register_marriage_bride_groom_details_audit ALTER COLUMN mother_aadharno TYPE VARCHAR(200);
    ALTER TABLE public.eg_register_marriage_bride_groom_details_audit ALTER COLUMN guardian_aadharno TYPE VARCHAR(200);

