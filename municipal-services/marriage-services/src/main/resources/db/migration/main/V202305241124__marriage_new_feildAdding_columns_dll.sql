ALTER TABLE IF EXISTS public.eg_marriage_details
 ADD COLUMN IF NOT EXISTS user_id character varying(64) COLLATE pg_catalog."default";

ALTER TABLE IF EXISTS public.eg_marriage_details_audit
 ADD COLUMN IF NOT EXISTS user_id character varying(64) COLLATE pg_catalog."default";