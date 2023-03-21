ALTER TABLE public.eg_marriage_present_address_details
ADD COLUMN poname_en character varying(64) COLLATE pg_catalog."default";


ALTER TABLE public.eg_marriage_present_address_details_audit
ADD COLUMN poname_en character varying(64) COLLATE pg_catalog."default";



ALTER TABLE public.eg_marriage_permanent_address_details
ADD COLUMN poname_en character varying(64) COLLATE pg_catalog."default";


ALTER TABLE public.eg_marriage_permanent_address_details_audit
ADD COLUMN poname_en character varying(64) COLLATE pg_catalog."default";
