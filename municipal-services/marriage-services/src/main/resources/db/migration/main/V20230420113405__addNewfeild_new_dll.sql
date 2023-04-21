ALTER TABLE public.eg_marriage_permanent_address_details
ADD COLUMN IF NOT EXISTS state_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS district_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS country_name character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_permanent_address_details_audit
ADD COLUMN IF NOT EXISTS state_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS district_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS country_name character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_permanent_address_details
ADD COLUMN IF NOT EXISTS state_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS district_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS country_name character varying(1000) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_permanent_address_details_audit
ADD COLUMN IF NOT EXISTS state_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS district_name character varying(1000) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS country_name character varying(1000) COLLATE pg_catalog."default";