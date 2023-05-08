ALTER TABLE public.eg_marriage_present_address_details
    ADD COLUMN present_tenentid character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_permanent_address_details
    ADD COLUMN permanent_tenentid character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_present_address_details_audit
    ADD COLUMN present_tenentid character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_marriage_permanent_address_details_audit
    ADD COLUMN permanent_tenentid character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_present_address_details
    ADD COLUMN present_tenentid character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_permanent_address_details
    ADD COLUMN permanent_tenentid character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_present_address_details_audit
    ADD COLUMN present_tenentid character varying(64) COLLATE pg_catalog."default";

ALTER TABLE public.eg_register_marriage_permanent_address_details_audit
    ADD COLUMN permanent_tenentid character varying(64) COLLATE pg_catalog."default";
