ALTER TABLE public.eg_marriage_permanent_address_details
ADD COLUMN bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL;

ALTER TABLE public.eg_marriage_permanent_address_details_audit
ADD COLUMN bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL;



ALTER TABLE public.eg_marriage_present_address_details
ADD COLUMN bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL;

ALTER TABLE public.eg_marriage_present_address_details_audit
ADD COLUMN  bride_groom character varying(64) COLLATE pg_catalog."default" NOT NULL;
