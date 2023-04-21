ALTER TABLE public.eg_marriage_details
ADD COLUMN IF NOT EXISTS bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS bride_expired boolean,
ADD COLUMN IF NOT EXISTS groom_expired boolean;

ALTER TABLE public.eg_marriage_details_audit
ADD COLUMN IF NOT EXISTS bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS bride_expired boolean,
ADD COLUMN IF NOT EXISTS groom_expired boolean;

ALTER TABLE public.eg_register_marriage_details
ADD COLUMN IF NOT EXISTS bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS bride_expired boolean,
ADD COLUMN IF NOT EXISTS groom_expired boolean;

ALTER TABLE public.eg_register_marriage_details_audit
ADD COLUMN IF NOT EXISTS bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN IF NOT EXISTS bride_expired boolean,
ADD COLUMN IF NOT EXISTS groom_expired boolean;