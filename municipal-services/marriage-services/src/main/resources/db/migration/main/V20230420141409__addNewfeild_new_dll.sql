ALTER TABLE public.eg_marriage_details
ADD COLUMN IF NOT EXISTS zonal_office character varying(100) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_details_audit
ADD COLUMN IF NOT EXISTS zonal_office character varying(100) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details
ADD COLUMN IF NOT EXISTS zonal_office character varying(100) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_details_audit
ADD COLUMN IF NOT EXISTS zonal_office character varying(100) COLLATE pg_catalog."default";
