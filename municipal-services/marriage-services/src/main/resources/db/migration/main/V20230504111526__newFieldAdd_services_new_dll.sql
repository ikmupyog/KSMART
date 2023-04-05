ALTER TABLE public.eg_marriage_details
ADD COLUMN bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN bride_expired boolean,
ADD COLUMN groom_expired boolean;

ALTER TABLE public.eg_marriage_details_audit
ADD COLUMN bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN bride_expired boolean,
ADD COLUMN groom_expired boolean;

ALTER TABLE public.eg_register_marriage_details
ADD COLUMN bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN bride_expired boolean,
ADD COLUMN groom_expired boolean;

ALTER TABLE public.eg_register_marriage_details_audit
ADD COLUMN bride_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN groom_filestoreid character varying(256) COLLATE pg_catalog."default",
ADD COLUMN bride_expired boolean,
ADD COLUMN groom_expired boolean;